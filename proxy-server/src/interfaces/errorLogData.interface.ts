export interface ILeakedData {
  name: string
  type: string
}

export interface IErrorLogData {
  title: string
  description: string
  routeId: any
  leakedData: ILeakedData[]
  level: string
}
