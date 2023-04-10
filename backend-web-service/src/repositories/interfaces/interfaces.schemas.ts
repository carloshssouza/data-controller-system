import { TypeId } from '../../types/mongoose'

export interface IUser {
    name: string;
    email: string;
    password: string;
    type: string;
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
    mongoUriHost: string
    applicationHost?: string
    restrictDataList?: IRestrictData
}

export interface IBlackList {
    token: string
    expiresAt: Date
}
