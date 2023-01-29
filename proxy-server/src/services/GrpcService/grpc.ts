import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import path from 'path'
import {
  PackageDefinition,
  GrpcObject,
  ServiceClientConstructor,
  ProtobufTypeDefinition
} from '../../types/grpc'
import { IErrorLogData } from '../../interfaces/errorLogData.interface'
import IApiData from '../../interfaces/apiData.interface'
import dotenv from 'dotenv'

dotenv.config()

class GrpcClient {
  private packageDef: PackageDefinition
  private grpcObject: GrpcObject
  private controlSystemPackage: ServiceClientConstructor | ProtobufTypeDefinition | GrpcObject | any
  private client: any

  constructor () {
    this.packageDef = protoLoader.loadSync(path.resolve(__dirname, '../../proto/controlSystem.proto'), {})
    this.grpcObject = grpc.loadPackageDefinition(this.packageDef)
    this.controlSystemPackage = this.grpcObject.controlSystemPackage
    this.client = new this.controlSystemPackage.ControlSystemService(`${process.env.GRPC_HOST}`, grpc.credentials.createInsecure())
  }

  /**
   * Method responsible for get Api info about permission using gRPC
   * @param endpointPath
   * @param requestType
   * @returns Returns the api info or error
   */
  public async getApiPermission (endpointPath: string, requestType: string): Promise<IApiData | any> {
    return new Promise((resolve, reject) => {
      this.client.getApiPermission({ endpointPath, requestType }, (err: any, response: any) => {
        if (err) {
          reject(err)
        } else {
          resolve(response)
        }
      })
    })
  }

  /**
   * Method responsible for create a log error using gRPC
   * @param errorLogData Object containing the log error data to be created
   * @returns Returns the response with message confirmation or error
   */
  public async createErrorLog (errorLogData: IErrorLogData): Promise<string | any> {
    return new Promise((resolve, reject) => {
      this.client.createErrorLog({
        ...errorLogData
      }, (err: any, response: any) => {
        if (err) {
          reject(err)
        }
        resolve(response)
      })
    })
  }
}

export default new GrpcClient()
