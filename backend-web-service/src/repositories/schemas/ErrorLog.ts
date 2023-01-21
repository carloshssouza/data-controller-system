
import { Schema, model } from '../../types/mongoose'
import { ILeakedData, IErrorLog } from '../interfaces/interfaces.schemas'

const LeakedDataSchema = new Schema<ILeakedData>({
  name: { type: String, required: true },
  type: { type: String, required: true }
})

const ErrorLogSchema = new Schema<IErrorLog>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  routeId: { type: Schema.Types.ObjectId, required: true, ref: 'Api' },
  routeName: { type: String, required: true, ref: 'Api' },
  leakData: { type: [LeakedDataSchema], required: true },
  level: { type: String, required: true, enum: ['low', 'medium', 'high'] }
}, {
  timestamps: true,
  versionKey: false
})

export default model('ErrorLog', ErrorLogSchema)
