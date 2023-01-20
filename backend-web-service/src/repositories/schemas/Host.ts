
import { Schema, model } from '../../types/mongoose'
import { IHost } from '../interfaces/interfaces.schemas'

const HostSchema = new Schema<IHost>({
  url: { type: String, required: true },
  port: { type: String, required: true },
  prefix: { type: String, require: true }
}, {
  timestamps: true,
  versionKey: false
})

export default model('Host', HostSchema)
