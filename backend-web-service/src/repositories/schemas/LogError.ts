
import { Schema, model } from '../../types/mongoose'
import { ILeakData, ILogError } from '../interfaces/interfaces.schemas'

const LeakDataSchema = new Schema<ILeakData>({
  name: { type: String, required: true },
  type: { type: String, required: true }
})

const LogErrorSchema = new Schema<ILogError>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  routeId: { type: Schema.Types.ObjectId, required: true, ref: 'Api' },
  routeName: { type: String, required: true, ref: 'Api' },
  leakData: { type: [LeakDataSchema], required: true }
}, {
  timestamps: true,
  versionKey: false
})

export default model('LogError', LogErrorSchema)
