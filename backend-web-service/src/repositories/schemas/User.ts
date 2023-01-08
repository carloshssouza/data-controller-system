
import { Schema, model } from '../../types/mongoose'
import { IUser } from '../interfaces/interfaces.schemas'

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, require: true }
}, {
  timestamps: true,
  versionKey: false
})

export default model('User', UserSchema)
