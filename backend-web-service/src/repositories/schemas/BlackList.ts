
import { Schema, model } from '../../types/mongoose'
import { IBlackList } from '../interfaces/interfaces.schemas'

const BlackListSchema = new Schema<IBlackList>({
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true, index: { expireAfterSeconds: 0 } }
}, {
  timestamps: true,
  versionKey: false
})

export default model('RevokedToken', BlackListSchema)
