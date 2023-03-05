import ErrorRes from '../../utils/Erro'
import ConfigurationEntity from '../../entities/configuration/configuration.entity'
import { Request, Response } from '../../types/express'

class ConfigurationGetAppHostConnectionController {
  public async getConfiguration (req: Request, res: Response): Promise<Response> {
    try {
      const configuration = await ConfigurationEntity.getConfiguration()

      if (!configuration) {
        throw new ErrorRes(500, 'Error getting Configuration')
      }

      if (!configuration.applicationHost) {
        throw new ErrorRes(404, 'Application host not found')
      }

      return res.status(200).json({ message: 'App host connected' })
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new ConfigurationGetAppHostConnectionController()
