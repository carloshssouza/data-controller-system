import ErrorRes from '../../utils/Erro'
import { Request, Response } from '../../types/express'
import ConfigurationEntity from '../../entities/configuration/configuration.entity'
import FileService from '../../utils/Services/FileService'

class ConfigurationCreateController {
  async createConfiguration (req: Request, res: Response): Promise<Response> {
    try {
      const configuration = await ConfigurationEntity.createConfiguration(req.body)

      if (!configuration) {
        throw new ErrorRes(400, 'Authentication failed')
      }
      const data = {
        mongoUriHost: configuration.mongoUriHost
      }
      await FileService.createConfigFile(data, '../../../../configs/db.connection.json')

      return res.status(201).json({ message: 'Mongo connected' })
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new ConfigurationCreateController()
