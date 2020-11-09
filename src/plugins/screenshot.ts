export default async (ctx: any) => {
  await ctx.page.goto(ctx.url, {
    waitUntil: 'load',
    timeout: 0,
  })

  await ctx.page.screenshot({ path: 'screenshots.png' })
}
