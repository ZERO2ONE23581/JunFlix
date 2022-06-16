import { darkTheme, lightTheme } from '../styles/theme';
import { Layout } from '../src/components/Layout';
import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { SWRConfig } from 'swr';
import '../styles/reset.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState(true);
  const toggleTheme = () => {
    setTheme((p) => !p);
  };
  return (
    <SWRConfig
      value={{ fetcher: (url: string) => fetch(url).then((res) => res.json()) }}
    >
      <ThemeProvider theme={theme ? lightTheme : darkTheme}>
        <Layout onClick={toggleTheme} btnName={theme ? 'DARK' : 'LIGHT'}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SWRConfig>
  );
}

export default MyApp;
