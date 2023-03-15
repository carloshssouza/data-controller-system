
import mongoose, { Query } from 'mongoose'
import { Schema, model } from '../../types/mongoose'
import { IApi } from '../interfaces/interfaces.schemas'
import ErrorLog from './ErrorLog'

const ApiSchema = new Schema<IApi>({
  routeName: { type: String, required: true, unique: true },
  endpointPath: { type: String, required: true },
  requestType: { type: String, required: true, enum: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'] },
  dataReturnAllowed: { type: Boolean, required: true }
}, {
  timestamps: true,
  versionKey: false
})

ApiSchema.pre('remove', async function (this: mongoose.Document, next: () => void) {
  const apiId = this._id
  await ErrorLog.deleteMany({ routeId: apiId })
  next()
})

ApiSchema.pre<Query<IApi | null, IApi>>(/^findOneAndUpdate/, async function (next) {
  const { _id, endpointPath, routeName, requestType } = this.getUpdate() as {
    _id: mongoose.Types.ObjectId;
    endpointPath?: string;
    routeName?: string;
    requestType?: string;
  }

  // If endpointPath, routeName, or requestType fields are updated
  if (endpointPath || routeName || requestType) {
    // Find all ErrorLog documents that reference the updated Api document
    const errorLogs = await ErrorLog.find({ routeId: _id })

    // Update each ErrorLog document
    for (const errorLog of errorLogs) {
      if (endpointPath) {
        errorLog.endpointPath = endpointPath
      }
      if (routeName) {
        errorLog.routeName = routeName
      }
      if (requestType) {
        errorLog.requestType = requestType
      }

      await errorLog.save()
    }
  }

  next()
})
export default model('Api', ApiSchema)
