import useSWR, { SWRConfig } from 'swr';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{ fetcher: (url: string) => fetch(url).then((res) => res.json()) }}
    >
      <Component {...pageProps} />;
    </SWRConfig>
  );
}

export default MyApp;
