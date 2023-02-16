import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import path from 'path'
import ApiEntity from './entities/api/api.entity'
import ErrorLogEntity from './entities/errorLog/erroLog.entity'
import { io } from '.'

class GrpcServer {
  private server: grpc.Server

  constructor () {
    const packageDef = protoLoader.loadSync(path.resolve(__dirname, './proto/controlSystem.proto'), {})
    const grpcObject = grpc.loadPackageDefinition(packageDef)
    const controlSystemPackage = grpcObject.controlSystemPackage as any
    this.server = new grpc.Server()
    this.server.addService(controlSystemPackage.ControlSystemService.service, {
      getApiPermission: this.getApiPermission,
      createErrorLog: this.createErrorLog
    })
  }

  public start () {
    this.server.bindAsync(`${process.env.GRPC_HOST}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
      if (err) {
        console.error(err)
      }
      console.log(`gRPC server listening on ${port}`)
      this.server.start()
    })
  }

  private async getApiPermission (call: any, callback: any) {
    try {
      const endpointPath = call.request.endpointPath
      const requestType = call.request.requestType
      const apiPermission = await ApiEntity.getApiPermission(endpointPath, requestType)
      if (!apiPermission) {
        throw new Error('Error getting api permission')
      }
      callback(null, apiPermission)
    } catch (error) {
      console.log(error)
      callback(null, error)
    }
  }

  private async createErrorLog (call: any, callback: any) {
    try {
      const errorLogData = {
        title: call.request.title,
        description: call.request.description,
        routeId: call.request.routeId,
        leakedData: call.request.leakedData,
        level: call.request.level
      }
      const errorLog = await ErrorLogEntity.createErrorLog(errorLogData)
      if (!errorLog) {
        throw new Error('Error creating log error')
      }
      io.emit('error-log-data', JSON.stringify(errorLog))
      callback(null, errorLog)
    } catch (error) {
      callback(null, error)
    }
  }
}

export default new GrpcServer()
