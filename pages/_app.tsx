import '../styles/reset.css';
import { SWRConfig } from 'swr';
import { useState } from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import { Layout } from '../src/components/Layout';
import { darkTheme, lightTheme } from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState(false);
  const Fetcher = {
    fetcher: (url: string) => fetch(url).then((res) => res.json()),
  };
  const url = 'junflix.com';
  return (
    <SWRConfig value={Fetcher}>
      <ThemeProvider theme={theme ? lightTheme : darkTheme}>
        <Layout isLight={theme} setTheme={setTheme}>
          <Component {...pageProps} key={url} />
        </Layout>
      </ThemeProvider>
    </SWRConfig>
  );
}

export default MyApp;
