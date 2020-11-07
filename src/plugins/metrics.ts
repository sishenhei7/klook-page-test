import { getTimeFromPerformanceMetrics, extractDataFromPerformanceMetrics } from './utils'

export default async (ctx: any) => {
  await ctx.client.send('Performance.enable')
  await ctx.page.goto(ctx.url, {
    waitUntil: 'load',
    timeout: 0,
  })

  // FMP
  let firstMeaningfulPaint = 0
  let performanceMetrics
  while (firstMeaningfulPaint === 0) {
    await ctx.page.waitForTimeout(300)
    performanceMetrics = await ctx.client.send('Performance.getMetrics')
    firstMeaningfulPaint = getTimeFromPerformanceMetrics(performanceMetrics, 'FirstMeaningfulPaint')
  }
  firstMeaningfulPaint = extractDataFromPerformanceMetrics(performanceMetrics, 'FirstMeaningfulPaint')
    .FirstMeaningfulPaint

  // ttfb
  const performanceTiming = JSON.parse(await ctx.page.evaluate(() => JSON.stringify(window.performance.timing)))
  const timeToFirstByte = performanceTiming.responseStart - performanceTiming.requestStart

  // fp
  const firstPaint = JSON.parse(
    await ctx.page.evaluate(() => JSON.stringify(performance.getEntriesByName('first-paint'))),
  )[0].startTime

  // fcp
  const firstContentfulPaint = JSON.parse(
    await ctx.page.evaluate(() => JSON.stringify(performance.getEntriesByName('first-contentful-paint'))),
  )[0].startTime

  return {
    TTFB: timeToFirstByte,
    FP: firstPaint,
    FCP: firstContentfulPaint,
    FMP: firstMeaningfulPaint,
  }
}
