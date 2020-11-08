export default async (ctx: any) => {
  await ctx.page.setRequestInterception(true)

  // no-js screenshots
  ctx.page.on('request', (request: any) => {
    if (request.resourceType() === 'script') {
      request.abort()
    } else {
      request.continue()
    }
  })

  await ctx.page.goto(ctx.url, {
    waitUntil: 'load',
    timeout: 0,
  })

  await ctx.page.screenshot({ path: 'screenshots.png', fullPage: true })
}
