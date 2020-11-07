import { getTimeFromPerformanceMetrics, extractDataFromPerformanceMetrics } from './utils'

export default async (ctx: any) => {
  await ctx.client.send('Performance.enable')
  await ctx.page.goto(ctx.url, {
    waitUntil: 'load',
    timeout: 0,
  })
  // await ctx.page.waitForTimeout(1000);
  // const performanceMetrics = await ctx.client.send('Performance.getMetrics');

  let firstMeaningfulPaint = 0
  let performanceMetrics
  while (firstMeaningfulPaint === 0) {
    await ctx.page.waitForTimeout(300)
    performanceMetrics = await ctx.client.send('Performance.getMetrics')
    firstMeaningfulPaint = getTimeFromPerformanceMetrics(performanceMetrics, 'FirstMeaningfulPaint')
  }

  // const performanceTiming = JSON.parse(
  //   await ctx.page.evaluate(() => JSON.stringify(window.performance.timing))
  // );
  // return {
  //   metrics: JSON.stringify(performanceMetrics),
  //   timing: JSON.stringify(performanceTiming),
  //   fmp: firstMeaningfulPaint
  // }
  const fmp = extractDataFromPerformanceMetrics(performanceMetrics, 'FirstMeaningfulPaint')
  ctx.bar.tick('fetching fmp')
  return fmp
}
