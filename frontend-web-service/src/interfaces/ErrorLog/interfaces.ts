interface ILeakedData {
  _id: string;
  name: string;
  type: string;
}

interface IErrorLog {
  _id: string;
  routeName: string;
  routeId: string;
  title: string;
  description: string;
  leakedData: ILeakedData[];
  createdAt: Date;
  updatedAt: Date;
}

interface IErrorLogFilter {
  dateTime: string;
  routeName?: string;
  routeId?: string;
  level: string;
}

interface IErrorExtraInfo {
  total: number
  mostLeakedRouteName: string;
  mostLeakedDataName: string;
  amountPerLevel: {
    low: number,
    medium: number,
    high: number
  }
}

export type {
  IErrorLog,
  IErrorLogFilter,
  IErrorExtraInfo
}