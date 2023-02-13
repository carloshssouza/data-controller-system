interface ApiCreateData {
    routeName: string
    endpointPath: string
    requestType: string
    dataReturnAllowed: boolean
  }

interface ApiUpdateData {
  routeName?: string
  endpointPath?: string
  requestType?: string
  dataReturnAllowed?: boolean
}

export {
  ApiCreateData,
  ApiUpdateData
}
