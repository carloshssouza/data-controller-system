import fs from 'fs'
import path from 'path'

class File {
  public readFile (pathFile: string) {
    const fileContent = fs.readFileSync(path.resolve(__dirname, pathFile), 'utf8')
    const config = JSON.parse(fileContent)
    return config
  }
}

export default new File()
