import '../styles/reset.css';
import { SWRConfig } from 'swr';
import { useState } from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import { Layout } from '../src/components/Layout';
import { darkTheme, lightTheme } from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState(true);
  const toggleTheme = () => {
    setTheme((p) => !p);
  };
  return (
    <SWRConfig
      value={{ fetcher: (url: string) => fetch(url).then((res) => res.json()) }}
    >
      <ThemeProvider theme={theme ? darkTheme : lightTheme}>
        <Layout onClick={toggleTheme} btnName={theme ? 'Dark' : 'Light'}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SWRConfig>
  );
}

export default MyApp;
