import ErrorRes from '../../utils/Erro'
import ConfigurationEntity from '../../entities/configuration/configuration.entity'
import { Request, Response } from '../../types/express'
import FileService from '../../utils/Services/FileService'

class ConfigurationDeleteMongoHostController {
  public async deleteMongoHost (req: Request, res: Response): Promise<Response> {
    try {
      const mongoHost = await ConfigurationEntity.deleteMongoHost()
      if (!mongoHost) {
        throw new ErrorRes(400, 'Error deleting application host')
      }
      await FileService.deleteConfigFile('../../../../configs/db.connection.json')
      await FileService.deleteConfigFile('../../../../configs/restrictDataList.config.json')
      await FileService.deleteConfigFile('../../../../configs/applicationHost.config.json')
      return res.status(200).json({ message: 'Database connection deleted' })
    } catch (error) {
      console.error('error', error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new ConfigurationDeleteMongoHostController()
