import ErrorRes from '../../utils/Erro'
import { Request, Response } from '../../types/express'
import ConfigurationEntity from '../../entities/configuration/configuration.entity'
import FileService from '../../utils/Services/FileService'

class ConfigurationAddRestrictDataController {
  async addRestrictData (req: Request, res: Response): Promise<Response> {
    try {
      const dataType = req.query.dataType as unknown as string
      const configuration = await ConfigurationEntity.addRestrictData(req.body.dataName, dataType)

      if (!configuration) {
        throw new ErrorRes(400, 'Error updating configuration')
      }

      const restrictDataListConfig = {
        restrictDataList: configuration.restrictDataList
      }

      await FileService.createConfigFile(restrictDataListConfig, '../../../../configs/restrictDataList.config.json')

      return res.status(200).json({ message: 'New data added' })
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new ConfigurationAddRestrictDataController()
