interface ApiCreateData {
    routeName: string
    endpointPath: string
    typeRequest: string
    dataReturnAllowed: boolean
  }

interface ApiUpdateData {
  routeName?: string
  endpointPath?: string
  typeRequest?: string
  dataReturnAllowed?: boolean
}

export {
  ApiCreateData,
  ApiUpdateData
}
