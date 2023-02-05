import { createContext } from 'react';

export interface IApi {
  apis: any[],
  error: boolean,
}

interface IApiContext {
  apiData: IApi
  setApiData: (data: any) => void
}

export const ApiContext = createContext<IApiContext>({
  apiData: {
    apis: [],
    error: false
  },
  setApiData: () => {},
});
