
import { Schema, model } from '../../types/mongoose'
import { IConfiguration } from '../interfaces/interfaces.schemas'

const ConfigurationSchema = new Schema<IConfiguration>({
  mongoUriHost: { type: String, required: true },
  applicationHost: { type: String, required: false, allowNull: true }
}, {
  timestamps: true,
  versionKey: false
})

export default model('Configuration', ConfigurationSchema)
