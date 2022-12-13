import '../styles/reset.css';
import { SWRConfig } from 'swr';
import styled from '@emotion/styled';
import { Layout } from '../src/Layout';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import { AnimatePresence } from 'framer-motion';
import { darkTheme, lightTheme } from '../styles/theme';
import { Dispatch, SetStateAction, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [hide, setHide] = useState(false);
  const [theme, setTheme] = useState(false);
  const [fixed, setFixed] = useState(false);
  const Fetcher = {
    fetcher: (url: string) => fetch(url).then((res) => res.json()),
  };
  const url = 'junflix.com';
  return (
    <SWRConfig value={Fetcher}>
      <AnimatePresence>
        <ThemeProvider theme={theme ? lightTheme : darkTheme}>
          <Fixed isFixed={fixed}>
            <Layout _data={{ setTheme, theme, hide, setHide }}>
              <Component
                {...pageProps}
                key={url}
                theme={theme}
                setHide={setHide}
                setFixed={setFixed}
              />
            </Layout>
          </Fixed>
        </ThemeProvider>
      </AnimatePresence>
    </SWRConfig>
  );
}

export default MyApp;

const Fixed = styled.section<{ isFixed: boolean }>`
  position: ${(p) => p.isFixed && 'fixed'};
`;
export interface ISetFixed {
  setFixed: Dispatch<SetStateAction<boolean>>;
}
export interface IPage {
  theme: boolean;
  setHide: Dispatch<SetStateAction<boolean>>;
  setFixed: Dispatch<SetStateAction<boolean>>;
}
