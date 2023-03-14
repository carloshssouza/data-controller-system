import ProxyService from '../../utils/Services/ProxyService'
import { Request, Response } from '../../types/express'
import ErrorRes from '../../utils/Erro'

class ConfigurationCheckProxyController {
  public async checkProxy (req: Request, res: Response): Promise<Response> {
    try {
      const proxy = await ProxyService.checkProxyServer()

      if (proxy.status === 500) {
        throw new ErrorRes(proxy.status, proxy.message)
      }

      return res.status(200).json({ message: proxy.message })
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new ConfigurationCheckProxyController()
