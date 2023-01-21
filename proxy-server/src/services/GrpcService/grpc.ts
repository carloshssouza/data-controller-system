import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import {
  PackageDefinition,
  GrpcObject,
  ServiceClientConstructor,
  ProtobufTypeDefinition
} from '../../types/grpc'

interface IGetApiPermissionResponse {
  _id: any
  endpointPath: string
  dataReturnAllowed: boolean
}
interface LeakData {
  name: string
  type: string
}
interface IErrorLogRequest {
  title: string
  description: string
  routeId: string
  endpointPath: string
  routeName : string
  leakData: LeakData[]
}

export default class GrpcClient {
  private packageDef: PackageDefinition
  private grpcObject: GrpcObject
  private controlSystemPackage: ServiceClientConstructor | ProtobufTypeDefinition | GrpcObject | any
  private client: any

  constructor () {
    this.packageDef = protoLoader.loadSync('./controlSystem.proto', {})
    this.grpcObject = grpc.loadPackageDefinition(this.packageDef)
    this.controlSystemPackage = this.grpcObject.controlSystemPackage
    this.client = new this.controlSystemPackage.ControlSystem('0.0.0.0:8080', grpc.credentials.createInsecure())
  }

  /**
   * Method responsible for get Api info about permission using gRPC
   * @param endpointPath
   * @param requestType
   * @returns Returns the api info or error
   */
  public async getApiPermission (endpointPath: string, requestType: string): Promise<IGetApiPermissionResponse | any> {
    this.client.getApiPermission({
      endpointPath,
      requestType
    }, (err: any, response: any) => {
      if (err) {
        return err
      }
      return response
    })
  }

  /**
   * Method responsible for create a log error using gRPC
   * @param errorLogData Object containing the log error data to be created
   * @returns Returns the response with message confirmation or error
   */
  public async createErrorLog (errorLogData: IErrorLogRequest): Promise<string | any> {
    this.client.createErrorLog({
      ...errorLogData
    }, (err: any, response: any) => {
      if (err) {
        return err
      }
      return response
    })
  }
}
