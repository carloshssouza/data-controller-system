import ErrorRes from '../../utils/Erro'
import { Request, Response } from '../../types/express'
import ConfigurationEntity from '../../entities/configuration/configuration.entity'

class ConfigurationAddApplicationHostController {
  async addApplicationHost (req: Request, res: Response): Promise<Response> {
    try {
      const configuration = await ConfigurationEntity.addApplicationHost(req.body)

      if (!configuration) {
        throw new ErrorRes(400, 'Error updating configuration')
      }

      return res.status(200).json({ message: 'Configuration updated' })
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new ConfigurationAddApplicationHostController()
