
import fs from 'fs'
import startProxy from './ProxyService'

class FileService {
  public createConfigFile (applicationHost: string) {
    try {
      const configString = JSON.stringify({ applicationHost })
      const filePath = '../../../../proxy-server/config.json'
      fs.writeFile(filePath, configString, (err) => {
        if (err) {
          console.error(`Error writing config file: ${err.message}`)
          return
        }
        console.log('Config file saved successfully')
        startProxy()

        return true
      })
    } catch (error) {
      return false
    }
  }
}

export default new FileService()
