
import { Schema, model } from '../../types/mongoose'
import { IUser } from '../interfaces/interfaces.schemas'

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  accountName: { type: String, required: true, unique: true },
  password: { type: String, require: true },
  type: { type: String, required: true, default: 'user', enum: ['user', 'admin'] },
  extraPermissions: { type: [String], required: true, default: ['get_users'] }
}, {
  timestamps: true,
  versionKey: false
})

export default model('User', UserSchema)
