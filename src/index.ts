import { client } from './client'
import writer from './writer'
import metrics from './plugins/metrics'
import timing from './plugins/timing'
// import noJsScreenshot from './plugins/no-js-screenshot'
import screenshot from './plugins/screenshot'

const test = async (url: string, runs = 1, file?: string) => {
  const works = [metrics, timing, screenshot]
  const res = await client({ runs, url, works, type: 'mobile' })

  console.log('result', res)

  writer(JSON.stringify(res), file)

  return res
}

test('https://www.klook.com/zh-CN/', 1, 'result.json')
// test('https://www.bilibili.com/', 1, 'result.json')
