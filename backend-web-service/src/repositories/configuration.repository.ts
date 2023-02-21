import { ConfigurationCreateData, ConfigurationUpdateData } from '../interfaces/configuration'
import { TypeId } from '../types/mongoose'
import Configuration from './schemas/Configuration'

class ConfigurationRepository {
  public createConfiguration (data: ConfigurationCreateData) {
    return Configuration.create(data)
  }

  public getConfiguration () {
    return Configuration.find({})
  }

  public updateConfiguration (_id: TypeId, data: ConfigurationUpdateData) {
    return Configuration.findOneAndUpdate({ _id }, data)
  }
}

export default new ConfigurationRepository()
