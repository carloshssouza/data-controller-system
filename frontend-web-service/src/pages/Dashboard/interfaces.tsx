export interface DataItem {
  routeName: string;
  requestType: string;
  leakedData: {
    name: string;
    type: string;
    _id: string;
  }[];
}