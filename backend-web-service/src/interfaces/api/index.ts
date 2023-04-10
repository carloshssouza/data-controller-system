
interface ApiCreateData {
    routeName: string
    endpointPath: string
    requestType: string
    dataReturnAllowed: boolean
    endpointPathLength: number
  }

interface ApiUpdateData {
  routeName?: string
  endpointPath?: string
  requestType?: string
  dataReturnAllowed?: boolean
  endpointPathLength?: number
}

export {
  ApiCreateData,
  ApiUpdateData
}
