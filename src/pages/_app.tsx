import SocketContextProvider from "@/components/contexts/socket";
import SSRFetcherProvider from "@/components/contexts/ssrFetcher";
import "@/styles/globals.css";
import { ThemeProvider, createTheme } from "@mui/material";
import type { AppProps } from "next/app";
import NavBar from "@/components/shared/navbar";

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
          <NavBar />
          <Component {...pageProps} />
        </SocketContextProvider>
      </SSRFetcherProvider>
    </ThemeProvider>
  );
}
