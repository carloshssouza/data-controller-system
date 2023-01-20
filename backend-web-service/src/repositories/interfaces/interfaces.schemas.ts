import { TypeId } from '../../types/mongoose'

export interface IUser {
    name: string;
    email: string;
    password: string;
}

export interface ILeakData {
  name: string;
  type: string
}
export interface ILogError {
    title: string;
    description: string;
    routeId: TypeId
    endpointPath: string;
    routeName: string
    leakData: ILeakData[]
}

export interface IApi {
    routeName: string;
    endpointPath: string;
    typeRequest: string
    dataReturnAllowed: boolean
}

export interface IHost {
    url: string;
    port: string;
    prefix: string;
}
