import ProxyService from '../../utils/Services/ProxyService'
import { Request, Response } from '../../types/express'

class ConfigurationStartProxyController {
  public async startProxy (req: Request, res: Response): Promise<Response> {
    try {
      ProxyService.stopProxy()
      return res.status(200).json({ message: 'Proxy server stopped' })
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new ConfigurationStartProxyController()
