
import mongoose, { Query } from 'mongoose'
import { Schema, model } from '../../types/mongoose'
import { IApi } from '../interfaces/interfaces.schemas'
import ErrorLog from './ErrorLog'

const ApiSchema = new Schema<IApi>({
  routeName: { type: String, required: true, unique: true },
  endpointPath: { type: String, required: true },
  requestType: { type: String, required: true, enum: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'] },
  dataReturnAllowed: { type: Boolean, required: true },
  endpointPathLength: { type: Number, required: true }
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
    dataReturnAllowed?: boolean;
    endpointPathLength: number;
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

// if api delete, delete all error logs that reference it
ApiSchema.pre<Query<IApi | null, IApi>>(/^findOneAndDelete/, async function (next) {
  const apiId = this.getQuery()._id
  await ErrorLog.deleteMany({ routeId: apiId })
  next()
})
export default model('Api', ApiSchema)
