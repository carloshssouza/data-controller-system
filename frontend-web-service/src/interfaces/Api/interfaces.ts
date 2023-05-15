export interface IApi {
  _id?: string;
  routeName: string;
  requestType: string;
  endpointPath: string;
  returnDataAllowed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
