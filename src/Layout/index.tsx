import {
  useState,
  Dispatch,
  useEffect,
  ReactElement,
  SetStateAction,
} from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { noneBorderVar } from '../../styles/variants';
import { Page } from '../../styles/global';

interface ILayoutProps {
  children: ReactElement;
  _data: {
    hide: boolean;
    theme: boolean;
    mobile: boolean;
    setFixed: Dispatch<SetStateAction<boolean>>;
    setTheme: Dispatch<SetStateAction<boolean>>;
  };
}
export const Layout = ({ _data, children }: ILayoutProps) => {
  const { theme, hide, setTheme, setFixed, mobile } = _data;
  return (
    <>
      {mobile && (
        <Cont
          exit="exit"
          animate="animate"
          initial="initial"
          custom={theme}
          variants={noneBorderVar}
        >
          {!hide && <Header _data={{ theme, setTheme, setFixed }} />}
          <section className="children">{children}</section>
          {!hide && <Footer theme={!theme} />}
        </Cont>
      )}
    </>
  );
};

const Cont = styled(Page)`
  width: 100vw;
  height: 100vh;
  min-width: 768px;
  border: 10px solid blue;
`;
