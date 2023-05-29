
import { Schema, model } from '../../types/mongoose'
import { IConfiguration, IRestrictData } from '../interfaces/interfaces.schemas'
import restrictDataList from '../utils/defaultRestrictDataList'

const RestrictDataListSchema = new Schema<IRestrictData>({
  personal: { type: [String], required: true },
  sensitive: { type: [String], required: true }
})

const ConfigurationSchema = new Schema<IConfiguration>({
  restrictDataList: { type: RestrictDataListSchema, required: true, defaultValue: restrictDataList }
}, {
  timestamps: true,
  versionKey: false
})

export default model('Configuration', ConfigurationSchema)
