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
    routeName: string
    leakData: ILeakData[]
}

export interface IApi {
    route: string;
    typeRequest: string
    dataReturnAllowed: boolean
}
