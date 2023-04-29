import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  FC,
  ReactNode,
} from "react";

type ContextType = {
  props: any;
  setProps: (props: any) => void;
};

export const SSRFetcherContext = createContext<ContextType>({} as ContextType);

type Props = {
  children: ReactNode;
  pageProps: any;
};

const SSRFetcherProvider: FC<Props> = ({ children, pageProps }) => {
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
};

export default SSRFetcherProvider;

export const useSSRFetcher = () => {
  return useContext(SSRFetcherContext);
};
