import { client } from './client'
import writer from './writer'
import metrics from './plugins/metrics'
import timing from './plugins/timing'

const test = async (url: string, runs = 1, file?: string) => {
  const works = [metrics, timing]
  const res = await client({ runs, url, works })

  console.log('result', res)

  writer(JSON.stringify(res), file)
}

test('http://localhost:7080/', 1, 'result.json')
