import React, { useEffect, useState, createContext, useContext } from "react";

type ContextType = {
  props: any;
  setProps: (props: any) => void;
};

export const SSRFetcherContext = createContext<ContextType>({} as ContextType);

export default function SSRFetcherProvider({ children, pageProps }) {
  const [pagePropsState, setPagePropsState] = useState(pageProps || {});

  useEffect(() => {
    setPagePropsState(pageProps);
  }, [pageProps]);

  return (
    <SSRFetcherContext.Provider
      value={{ props: pagePropsState, setProps: setPagePropsState }}
    >
      {children}
    </SSRFetcherContext.Provider>
  );
}

export const useSSRFetcher = () => {
  return useContext(SSRFetcherContext);
};
