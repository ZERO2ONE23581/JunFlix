import '../styles/reset.css';
import { SWRConfig } from 'swr';
import styled from '@emotion/styled';
import { Layout } from '../src/Layout';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import { AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { darkTheme, lightTheme } from '../styles/theme';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [hide, setHide] = useState(false);
  const [theme, setTheme] = useState(false);
  const [fixed, setFixed] = useState(false);
  const Fetcher = {
    fetcher: (url: string) => fetch(url).then((res) => res.json()),
  };
  const url = 'junflix.com';
  //
  const [mobile, setMobile] = useState(false);
  const isMobile = useMediaQuery({
    query: '(min-width : 370px) and (max-width : 767px)',
  });
  console.log(isMobile);
  useEffect(() => {
    if (isMobile) setMobile(true);
  }, [setMobile, isMobile]);
  return (
    <>
      <SWRConfig value={Fetcher}>
        <AnimatePresence>
          <ThemeProvider theme={theme ? lightTheme : darkTheme}>
            <Fixed isFixed={fixed}>
              <Layout _data={{ mobile, setTheme, theme, hide, setFixed }}>
                <Component
                  {...pageProps}
                  key={url}
                  theme={theme}
                  mobile={mobile}
                  setHide={setHide}
                  setFixed={setFixed}
                />
              </Layout>
            </Fixed>
          </ThemeProvider>
        </AnimatePresence>
      </SWRConfig>
    </>
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
  mobile?: boolean;
  setHide: Dispatch<SetStateAction<boolean>>;
  setFixed: Dispatch<SetStateAction<boolean>>;
}
