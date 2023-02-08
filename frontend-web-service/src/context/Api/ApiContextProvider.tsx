import { useState } from "react";
import { ApiContext, IApi } from "./ApiContext";

export const ApiContextProvider = ({ children }: any) => {
  const [apiData, setApiData] = useState<IApi>({
    apis: [],
    api: null,
    success: false,
    error: false
  });

  return (
    <ApiContext.Provider value={{ apiData, setApiData }}>
      {children}
    </ApiContext.Provider>
  );
};
