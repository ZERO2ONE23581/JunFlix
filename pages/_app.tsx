import '../styles/reset.css';
import { SWRConfig } from 'swr';
import { useState } from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import { Layout } from '../src/Layout';
import { darkTheme, lightTheme } from '../styles/theme';
import { AnimatePresence } from 'framer-motion';

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState(false);
  const Fetcher = {
    fetcher: (url: string) => fetch(url).then((res) => res.json()),
  };
  const url = 'junflix.com';
  return (
    <SWRConfig value={Fetcher}>
      <AnimatePresence>
        <ThemeProvider theme={theme ? lightTheme : darkTheme}>
          <Layout setTheme={setTheme} theme={theme}>
            <Component theme={theme} {...pageProps} key={url} />
          </Layout>
        </ThemeProvider>
      </AnimatePresence>
    </SWRConfig>
  );
}

export default MyApp;
