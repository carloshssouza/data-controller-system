import { TypeId } from '../../types/mongoose'

export interface IUser {
    name: string;
    email: string;
    password: string;
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
    leakedData: ILeakedData[],
    level: string
}

export interface IApi {
    routeName: string;
    endpointPath: string;
    typeRequest: string
    dataReturnAllowed: boolean
}
