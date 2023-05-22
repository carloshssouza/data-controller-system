import { TypeId } from '../../types/mongoose'

export interface IUser {
    name: string;
    accountName: string;
    password: string;
    type: string;
    extraPermissions: string[]
}

export interface ILeakedData {
  name: string;
  type: string
}
export interface IErrorLog {
    title: string;
    description: string;
    routeId: TypeId
    endpointPath: string;
    routeName: string
    requestType: string
    leakedData: ILeakedData[],
    level: string
}

export interface IParameters {
    name: string
    position: number
}

export interface IApi {
    _id?: TypeId
    routeName: string;
    endpointPath: string;
    requestType: string
    dataReturnAllowed: boolean
    routeParameters: IParameters[]
    endpointPathLength: number
}

export interface IRestrictData {
    personal: string[]
    sensible: string[]
}
export interface IConfiguration {
    restrictDataList: IRestrictData
}

export interface IBlackList {
    token: string
    expiresAt: Date
}
