import { css } from '@emotion/react';
import { Btn } from '../Btn';
import { Footer } from './parts/Footer';
import { Header } from './parts/Header';

export const Layout = ({ children, onClick, btnName }: any) => {
  //
  return (
    <>
      <Header btnName={btnName} onClick={onClick} />
      {/* <Btn type="theme" /> */}
      {children}
      <Footer />
    </>
  );
};
