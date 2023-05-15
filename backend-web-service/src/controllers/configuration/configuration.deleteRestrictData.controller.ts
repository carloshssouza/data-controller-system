import ErrorRes from '../../utils/Erro'
import { Request, Response } from '../../types/express'
import ConfigurationEntity from '../../entities/configuration/configuration.entity'
import FileService from '../../utils/Services/FileService'

class ConfigurationDeleteRestrictDataController {
  async deleteRestrictData (req: Request, res: Response): Promise<Response> {
    try {
      const dataType = req.query.dataType as unknown as string
      const dataName = req.query.dataName as unknown as string
      const configuration = await ConfigurationEntity.deleteRestrictData(dataName, dataType)

      if (!configuration) {
        throw new ErrorRes(400, 'Error deleting configuration restrict data')
      }

      const restrictDataListConfig = {
        restrictDataList: configuration.restrictDataList
      }

      await FileService.createConfigFile(restrictDataListConfig, '../../../../configs/restrictDataList.config.json')

      return res.status(200).json({ message: 'Restrict data deleted' })
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new ConfigurationDeleteRestrictDataController()
