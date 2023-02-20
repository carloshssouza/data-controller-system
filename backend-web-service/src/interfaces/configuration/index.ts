interface ConfigurationCreateData {
  mongoUrlHost: string
}

interface ConfigurationUpdateData {
  mongoUrlHost?: string
  applicationHost?: string
}

export {
  ConfigurationCreateData,
  ConfigurationUpdateData
}
