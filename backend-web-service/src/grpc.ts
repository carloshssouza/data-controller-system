import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import ApiEntity from './entities/api/api.entity'
import LogErrorEntity from './entities/logError/logError.entity'
import { io } from '.'

class GrpcServer {
  private server: grpc.Server

  constructor () {
    const packageDef = protoLoader.loadSync('./controlSystem.proto', {})
    const grpcObject = grpc.loadPackageDefinition(packageDef)
    const controlSystemPackage = grpcObject.controlSystemPackage as any
    this.server = new grpc.Server()
    this.server.addService(controlSystemPackage.ControlSystem.service, {
      getApiPermission: this.getApiPermission,
      createLogError: this.createLogError
    })
  }

  public start () {
    this.server.bindAsync('0.0.0.0:8080', grpc.ServerCredentials.createInsecure(), (err, port) => {
      if (err) {
        console.error(err)
      }
      console.log(`gRPC server listening on ${port}`)
      this.server.start()
    })

    io.on('connection', (socket: any) => {
      console.log('Socket connected')
    })
  }

  private async getApiPermission (call: any, callback: any) {
    try {
      const route = call.request.route
      const apiPermission = await new ApiEntity().getApiPermission(route)
      if (!apiPermission) {
        throw new Error('Error getting api permission')
      }
      callback(null, apiPermission)
    } catch (error) {
      callback(null, error)
    }
  }

  private async createLogError (call: any, callback: any) {
    try {
      const logErrorData = {
        title: call.request.title,
        description: call.request.description,
        routeId: call.request.routeId,
        routeName: call.request.routeName,
        leakData: call.request.leakData
      }
      const logError = await new LogErrorEntity().createLogError(logErrorData)
      if (!logError) {
        throw new Error('Error creating log error')
      }

      io.emit('new-logError', logError)

      callback(null, {
        message: 'Log error created with successfully'
      })
    } catch (error) {
      callback(null, error)
    }
  }
}

export default new GrpcServer()
