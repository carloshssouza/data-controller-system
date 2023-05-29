interface IRestrictDataList {
  personal?: string[]
  sensitive?: string[]
}

interface ConfigurationCreateData {
  restrictDataList?: IRestrictDataList
}

interface ConfigurationUpdateData {
  restrictDataList?: IRestrictDataList
}

export {
  IRestrictDataList,
  ConfigurationCreateData,
  ConfigurationUpdateData
}
