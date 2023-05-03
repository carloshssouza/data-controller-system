import * as fs from 'fs'
import path from 'path'

class FileService {
  public async createConfigFile (data: any, pathFile: string): Promise<boolean> {
    try {
      // Check if the config file exists
      if (fs.existsSync(pathFile)) {
        const config = JSON.parse(fs.readFileSync(path.resolve(__dirname, pathFile), 'utf8'))

        Object.assign(config, data)

        fs.writeFileSync(path.resolve(__dirname, pathFile), JSON.stringify(data, null, 2))
      } else {
        fs.writeFileSync(path.resolve(__dirname, pathFile), JSON.stringify(data, null, 2))
        console.log('Config file saved successfully')
        return true
      }
    } catch (error) {
      console.error(`Error writing config file: ${error}`)
      return false
    }
  }

  public async readConfigFile (pathFile: string): Promise<any> {
    const absolutePath = path.resolve(__dirname, pathFile)
    const fileContent = fs.readFileSync(absolutePath, 'utf8')
    if (!fileContent) {
      throw new Error('Error reading file')
    }
    const config = JSON.parse(fileContent)
    return config
  }
}

export default new FileService()
