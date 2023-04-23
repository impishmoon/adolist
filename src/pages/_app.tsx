import SocketContextProvider from "@/components/contexts/socket";
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
      <SocketContextProvider>
        <Component {...pageProps} />
      </SocketContextProvider>
    </ThemeProvider>
  );
}
