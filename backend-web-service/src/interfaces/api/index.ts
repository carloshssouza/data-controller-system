import { IParameters } from '../../repositories/interfaces/interfaces.schemas'

interface ApiCreateData {
    routeName: string
    endpointPath: string
    requestType: string
    dataReturnAllowed: boolean
    routeParameters?: IParameters[]
    endpointPathLength: number
  }

interface ApiUpdateData {
  routeName?: string
  endpointPath?: string
  requestType?: string
  dataReturnAllowed?: boolean
  routeParameters?: IParameters[]
  endpointPathLength?: number
}

export {
  ApiCreateData,
  ApiUpdateData
}
