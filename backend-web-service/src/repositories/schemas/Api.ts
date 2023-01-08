
import { Schema, model } from '../../types/mongoose'
import { IApi } from '../interfaces/interfaces.schemas'

const ApiSchema = new Schema<IApi>({
  route: { type: String, required: true },
  dataReturnAllowed: { type: Boolean, required: true }
}, {
  timestamps: true,
  versionKey: false
})

export default model('Api', ApiSchema)
