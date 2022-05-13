import { ThemeProvider } from '@emotion/react';
import { SWRConfig } from 'swr';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from '../src/components/Layout';
import { darkTheme, lightTheme } from '../src/types/theme';
import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState(false);
  const toggleTheme = () => {
    setTheme((p) => !p);
  };
  //
  return (
    <SWRConfig
      value={{ fetcher: (url: string) => fetch(url).then((res) => res.json()) }}
    >
      <ThemeProvider theme={theme ? lightTheme : darkTheme}>
        <Layout onClick={toggleTheme} btnName={theme ? 'LIGHT' : 'DARK'}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SWRConfig>
  );
}

export default MyApp;
