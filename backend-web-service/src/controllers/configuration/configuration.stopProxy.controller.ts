import ProxyService from '../../utils/Services/ProxyService'
import { Request, Response } from '../../types/express'

class ConfigurationStopProxyController {
  public async stopProxy (req: Request, res: Response): Promise<Response> {
    try {
      const message = ProxyService.stopProxy()
      return res.status(200).json({ message })
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new ConfigurationStopProxyController()
