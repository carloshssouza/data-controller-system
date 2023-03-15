import ErrorRes from '../../utils/Erro'
import ConfigurationEntity from '../../entities/configuration/configuration.entity'
import { Request, Response } from '../../types/express'

class ConfigurationDeleteApplicationHostController {
  public async deleteApplicationHost (req: Request, res: Response): Promise<Response> {
    try {
      const applicationHost = await ConfigurationEntity.deleteApplicationHost()
      if (!applicationHost) {
        throw new ErrorRes(400, 'Error deleting application host')
      }
      return res.status(200).json({ message: 'Database connection established' })
    } catch (error) {
      console.error('error', error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new ConfigurationDeleteApplicationHostController()
