export interface ILeakedData {
  name: string
  type: string
}

export interface IErrorLogData {
  title: string
  description: string
  routeId: any
  endpointPath: string
  routeName: string
  leakedData: ILeakedData[]
  level: string
}
