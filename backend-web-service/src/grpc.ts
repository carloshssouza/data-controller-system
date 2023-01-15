import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'

class GrpcServer {
  private server: grpc.Server

  constructor () {
    const packageDef = protoLoader.loadSync('./controlSystem.proto', {})
    const grpcObject = grpc.loadPackageDefinition(packageDef)
    const controlSystemPackage = grpcObject.controlSystemPackage as any

    this.server = new grpc.Server()
    this.server.addService(controlSystemPackage.ControlSystem.service, {
      getApiPermission: this.getApiPermission.bind(this),
      sendLogDataError: this.sendLogDataError.bind(this)
    })
    this.server.bind('0.0.0.0:8080', grpc.ServerCredentials.createInsecure())
  }

  public start () {
    this.server.start()
  }

  private getApiPermission (call: any, callback: any) {
    callback(null, {})
  }

  private sendLogDataError (call: any, callback: any) {
    callback(null, {})
  }
}

export default new GrpcServer()
