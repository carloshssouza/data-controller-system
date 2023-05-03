import ErrorRes from '../../utils/Erro'
import { Request, Response } from '../../types/express'
import ConfigurationEntity from '../../entities/configuration/configuration.entity'
import FileService from '../../utils/Services/FileService'

class ConfigurationAddApplicationHostController {
  async addApplicationHost (req: Request, res: Response): Promise<Response> {
    try {
      const configuration = await ConfigurationEntity.addApplicationHost(req.body)

      if (!configuration) {
        throw new ErrorRes(400, 'Error updating configuration')
      }

      const applicationHostConfig = {
        applicationHost: configuration.applicationHost
      }

      const applicationHostConfigFileCreated = await FileService.createConfigFile(applicationHostConfig, '../../../../configs/applicationHost.config.json')
      const restrictDataListConfigFileCreated = await FileService.createConfigFile(configuration.restrictDataList, '../../../../configs/restrictDataList.config.json')

      if (!applicationHostConfigFileCreated || !restrictDataListConfigFileCreated) throw new ErrorRes(500, 'Error creating config file')

      return res.status(200).json({ message: 'Configuration updated' })
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new ConfigurationAddApplicationHostController()
