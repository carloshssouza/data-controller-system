
import { Schema, model } from '../../types/mongoose'
import { IConfiguration, IRestrictData } from '../interfaces/interfaces.schemas'

const RestrictDataListSchema = new Schema<IRestrictData>({
  personal: { type: [String], required: true },
  sensible: { type: [String], required: true }
})

const ConfigurationSchema = new Schema<IConfiguration>({
  mongoUriHost: { type: String, required: true },
  applicationHost: { type: String, required: false, allowNull: true },
  restrictDataList: { type: RestrictDataListSchema, required: false, allowNull: true }
}, {
  timestamps: true,
  versionKey: false
})

export default model('Configuration', ConfigurationSchema)
