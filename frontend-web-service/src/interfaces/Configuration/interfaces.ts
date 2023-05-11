interface IRestrictData {
  personal: string[];
  sensible: string[];
}

interface IConfiguration {
  _id: string;
  mongoUri: string;
  applicationHostUrl: string;
  restrictDataList: IRestrictData[]
}

export type {
  IConfiguration,
  IRestrictData
}