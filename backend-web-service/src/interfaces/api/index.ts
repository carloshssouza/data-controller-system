import { IParameters } from '../../repositories/interfaces/interfaces.schemas'

interface ApiCreateData {
    routeName: string
    endpointPath: string
    requestType: string
    dataReturnAllowed: boolean
    routeParameters?: IParameters[]
  }

interface ApiUpdateData {
  routeName?: string
  endpointPath?: string
  requestType?: string
  dataReturnAllowed?: boolean
  routeParameters?: IParameters[]
}

export {
  ApiCreateData,
  ApiUpdateData
}
