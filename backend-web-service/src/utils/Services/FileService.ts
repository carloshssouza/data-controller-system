import fs from 'fs/promises'
import path from 'path'

class FileService {
  public async createConfigFile (data: any, pathFile: string): Promise<boolean> {
    try {
      const configString = JSON.stringify({ data })
      await fs.writeFile(path.resolve(__dirname, pathFile), configString)
      console.log('Config file saved successfully')
      return true
    } catch (error) {
      console.error(`Error writing config file: ${error}`)
      return false
    }
  }

  public async readConfigFile (pathFile: string): Promise<boolean> {
    const absolutePath = path.resolve(__dirname, pathFile)
    const fileContent = await fs.readFile(absolutePath, 'utf8')
    if (!fileContent) {
      return false
    }
    const config = JSON.parse(fileContent)
    return config.mongoUrlHost
  }
}

export default new FileService()
