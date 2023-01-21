import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'

interface IGetApiPermissionResponse {
  endpointPath: string
  dataReturnAllowed: boolean
}
interface LeakData {
  name: string
  type: string
}
interface ILogErrorRequest {
  title: string
  description: string
  routeId: string
  endpointPath: string
  routeName : string
  leakData: LeakData[]
}

class GrpcClient {
  private packageDef: any
  private grpcObject: any
  private controlSystemPackage: any
  private client: any

  constructor () {
    this.packageDef = protoLoader.loadSync('./controlSystem.proto', {})
    this.grpcObject = grpc.loadPackageDefinition(this.packageDef)
    this.controlSystemPackage = this.grpcObject.controlSystemPackage
    this.client = new this.controlSystemPackage.ControlSystem('0.0.0.0:8080', grpc.credentials.createInsecure())
  }

  public async getApiPermission (endpointPath: string, requestType: string): Promise<IGetApiPermissionResponse | any> {
    try {
      this.client.getApiPermission({
        endpointPath,
        requestType
      }, (err: any, response: any) => {
        if (err) {
          throw new Error(err)
        }
        return response
      })
    } catch (error) {
      return error
    }
  }

  public async createLogError (data: ILogErrorRequest): Promise<string | any> {
    try {
      this.client.createLogError({
        ...data
      }, (err: any, response: any) => {
        if (err) {
          throw new Error(err)
        }
        return response
      })
    } catch (error) {
      return error
    }
  }
}

export default GrpcClient