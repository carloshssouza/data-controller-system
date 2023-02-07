import { createContext } from 'react';
export interface IApi {
  apis: any[],
  api: any,
  success: boolean
  error: boolean,
}

interface IApiContext {
  apiData: IApi
  setApiData: (data: any) => void
}

export const ApiContext = createContext<IApiContext>({
  apiData: {
    apis: [],
    api: {},
    success: false,
    error: false
  },
  setApiData: () => {},
});
