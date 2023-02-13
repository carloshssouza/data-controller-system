
import { Schema, model } from '../../types/mongoose'
import { IApi } from '../interfaces/interfaces.schemas'

const ApiSchema = new Schema<IApi>({
  routeName: { type: String, required: true, unique: true },
  endpointPath: { type: String, required: true },
  requestType: { type: String, required: true, enum: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'] },
  dataReturnAllowed: { type: Boolean, required: true }
}, {
  timestamps: true,
  versionKey: false
})

export default model('Api', ApiSchema)
