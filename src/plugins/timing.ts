export default async (ctx: any) => {
  await ctx.client.send('Performance.enable')
  await ctx.page.goto(ctx.url, {
    waitUntil: 'load',
    timeout: 0,
  })

  // timing
  const timing = JSON.parse(await ctx.page.evaluate(() => JSON.stringify(window.performance.timing)))

  return {
    准备新页面时间耗时: timing.fetchStart - timing.navigationStart,
    redirect重定向耗时: timing.redirectEnd - timing.redirectStart,
    Appcache耗时: timing.domainLookupStart - timing.fetchStart,
    unload前文档耗时: timing.unloadEventEnd - timing.unloadEventStart,
    DNS查询耗时: timing.domainLookupEnd - timing.domainLookupStart,
    TCP连接耗时: timing.connectEnd - timing.connectStart,
    request请求耗时: timing.responseEnd - timing.requestStart,
    白屏时间: timing.responseStart - timing.navigationStart,
    请求完毕至DOM加载: timing.domInteractive - timing.responseEnd,
    解释dom树耗时: timing.domComplete - timing.domInteractive,
    从开始至load总耗时: timing.loadEventEnd - timing.navigationStart,
  }
}
