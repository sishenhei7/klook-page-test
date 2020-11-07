import { client } from './client'
import metrics from './plugins/metrics'

const test = async (url: string, runs = 1) => {
  const works = [metrics]
  const res = await client({ runs, url, works })
  console.log('result', res)
  process.exit()
}

test('https://www.klook.com', 5)
