interface IRestrictDataList {
  personal?: string[]
  sensible?: string[]
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
