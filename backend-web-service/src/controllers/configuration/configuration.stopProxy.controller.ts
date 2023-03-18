import ProxyService from '../../utils/Services/ProxyService'
import { Request, Response } from '../../types/express'
import ErrorRes from '../../utils/Erro'

class ConfigurationStopProxyController {
  public async stopProxy (req: Request, res: Response): Promise<Response> {
    try {
      const proxy = await ProxyService.stopProxy()
      if (proxy.status === 500) {
        throw new ErrorRes(proxy.status, proxy.message)
      }
      return res.status(200).json({ message: proxy })
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new ConfigurationStopProxyController()
