
interface ConfigurationCreateData {
  mongoUriHost: string
}

interface IRestrictDataList {
  personal?: string[]
  sensible?: string[]
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
