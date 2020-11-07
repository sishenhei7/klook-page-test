import path from 'path'
import fs from 'fs-extra'

export default async (json: any, file?: string, outDir?: string) => {
  if (file) {
    outDir = outDir || './'
    const filepath = path.join(outDir, file)

    fs.ensureDir(path.dirname(filepath)).then(() => fs.writeFile(filepath, json, 'utf-8'))
  }
}
