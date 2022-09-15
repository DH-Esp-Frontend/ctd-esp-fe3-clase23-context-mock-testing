import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@emotion/react'
import theme from "dh/mui/theme";
import CssBaseline from '@mui/material/CssBaseline';
import LayoutRed from 'dh/components/layouts/LayoutRed';

function MyApp({ Component, pageProps }: AppProps) {

  const LayoutComponent = (Component as any).Layout;

  return <>
    <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
    </Head>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {LayoutComponent && 
      <LayoutComponent>
        <Component {...pageProps} />
      </LayoutComponent>
      }
      {!LayoutComponent && 
        <Component {...pageProps} />
      }
    </ThemeProvider>
  </>

}

export default MyApp
