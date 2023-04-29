import SocketContextProvider from "@/components/contexts/socket";
import SSRFetcherProvider from "@/components/contexts/ssrFetcher";
import "@/styles/globals.css";
import { ThemeProvider, createTheme } from "@mui/material";
import type { AppProps } from "next/app";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <SSRFetcherProvider pageProps={pageProps}>
        <SocketContextProvider>
          <Component {...pageProps} />
        </SocketContextProvider>
      </SSRFetcherProvider>
    </ThemeProvider>
  );
}
