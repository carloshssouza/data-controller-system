
interface IRestrictDataList {
  personal?: string[]
  sensible?: string[]
}

interface ConfigurationCreateData {
  mongoUriHost: string
  restrictDataList: IRestrictDataList
}
interface ConfigurationUpdateData {
  mongoUriHost?: string
  applicationHost?: string
  restrictDataList?: IRestrictDataList
}

export {
  ConfigurationCreateData,
  ConfigurationUpdateData
}
