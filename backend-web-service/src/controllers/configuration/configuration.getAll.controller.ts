import ErrorRes from '../../utils/Erro'
import ConfigurationEntity from '../../entities/configuration/configuration.entity'
import { Request, Response } from '../../types/express'

class ConfigurationGetAllController {
  public async getConfiguration (req: Request, res: Response): Promise<Response> {
    try {
      const Configuration = await ConfigurationEntity.getConfiguration()

      if (!Configuration) {
        throw new ErrorRes(500, 'Error getting Configuration')
      }

      return res.status(201).json(Configuration)
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new ConfigurationGetAllController()
