import ErrorRes from '../../utils/Erro'
import { Request, Response } from '../../types/express'
import ConfigurationEntity from '../../entities/configuration/configuration.entity'

class ConfigurationGetRestrictDataController {
  async getRestrictData (req: Request, res: Response): Promise<Response> {
    try {
      const dataType = req.query.dataType as unknown as string
      const restrictDataList = await ConfigurationEntity.getRestrictData(dataType)

      if (!restrictDataList) {
        throw new ErrorRes(500, 'Error getting configuration restrict data')
      }

      return res.status(200).json(restrictDataList)
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new ConfigurationGetRestrictDataController()
