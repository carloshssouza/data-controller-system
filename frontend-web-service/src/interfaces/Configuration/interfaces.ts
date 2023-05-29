interface IRestrictDataList {
  personal: string[];
  sensitive: string[];
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