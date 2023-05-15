interface IRestrictDataList {
  personal: string[];
  sensible: string[];
}

interface IConfiguration {
  _id: string;
  mongoUri: string;
  applicationHostUrl: string;
  restrictDataList: IRestrictDataList[]
}

export type {
  IConfiguration,
  IRestrictDataList
}