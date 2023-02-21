interface ConfigurationCreateData {
  mongoUriHost: string
}

interface ConfigurationUpdateData {
  mongoUriHost?: string
  applicationHost?: string
}

export {
  ConfigurationCreateData,
  ConfigurationUpdateData
}
