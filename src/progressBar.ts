import progress from 'progress'
import chalk from 'chalk'

export type MyProgressBarOptions = {
  title: string
  total: number
  progressOptions?: ProgressBar.ProgressBarOptions
}

let count = 0

const defaultProgressOptions = {
  complete: '=',
  incomplete: ' ',
  width: 20,
  total: 10,
}

export class MyProgressBar {
  title: string
  color: string
  bar: ProgressBar

  private colorPallete = ['green', 'yellow', 'blue', 'magenta', 'cyan']

  constructor(options: MyProgressBarOptions) {
    const { title, total, progressOptions } = options

    this.title = title
    this.color = this.colorPallete[count++ % this.colorPallete.length]
    this.bar = new progress(':title[:bar]:msg', {
      ...defaultProgressOptions,
      ...(progressOptions || {}),
      total: total,
    })
  }

  tick(msg: string) {
    // @ts-ignore
    const log = chalk[this.color]

    this.bar.tick({
      title: `${log(this.title)}  `,
      msg,
    })
  }
}
