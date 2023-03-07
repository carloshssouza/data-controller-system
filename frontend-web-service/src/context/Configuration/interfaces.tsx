interface IRestrictDataList {
  personal: string[]
  sensibles: string[]
}

export interface IConfigurationResponse {
  mongoUriHost: string
  applicationHost: string
  restrictDataList: IRestrictDataList
}

export interface ConfigurationContextProps {
  configuration: IConfigurationResponse
  setConfiguration: React.Dispatch<React.SetStateAction<IConfigurationResponse>>
}
