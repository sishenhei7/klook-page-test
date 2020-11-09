import puppeteer from 'puppeteer'
import { MyProgressBar } from './progressBar'

export type work = (options: any) => any
export type clientOptions = {
  runs: number
  url: string
  type?: 'desktop' | 'mobile'
  works: work[]
}

const iPhone = puppeteer.devices['iPhone 8']

export const client = async (options: clientOptions) => {
  const { runs, url, type, works } = options
  const res = [] as any

  const bar = new MyProgressBar({
    title: type === 'desktop' ? 'desktop' : 'mobile',
    total: runs * works.length,
  })

  for (let k = 0; k < runs; ++k) {
    const browser = await puppeteer.launch()

    for (let i = 0, j = works.length; i < j; ++i) {
      const page = await browser.newPage()
      const client = await page.target().createCDPSession()

      if (type === 'mobile') {
        await client.send('Emulation.setCPUThrottlingRate', { rate: 6 })
        await page.emulate(iPhone)
      }

      const result = await works[i]({ client, page, bar, url })

      res.push(result)

      await page.close()
      bar.tick('')
    }

    await browser.close()
  }

  return res
}
