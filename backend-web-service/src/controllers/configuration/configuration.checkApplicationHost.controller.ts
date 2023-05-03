import isAppRunning from '../../utils/Services/CheckConnectionService'
import { Request, Response } from '../../types/express'
import ErrorRes from '../../utils/Erro'
import FileService from '../../utils/Services/FileService'
import ConfigurationEntity from '../../entities/configuration/configuration.entity'

class ConfigurationCheckApplicationHostController {
  public async checkApplicationHost (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.query.applicationUrl) {
        throw new ErrorRes(400, 'Application url is required')
      }
      const applicationHost = await isAppRunning(req.query.applicationUrl as unknown as string)
      if (!applicationHost) {
        throw new ErrorRes(500, 'Application host is not running')
      }

      const config = await ConfigurationEntity.getConfiguration()
      delete config.mongoUriHost

      const dataFile = {
        applicationHost: config.applicationHost
      }

      await FileService.createConfigFile(dataFile, '../../../../configs/applicationHost.config.json')

      return res.status(200).json({ message: 'Application running' })
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new ConfigurationCheckApplicationHostController()
