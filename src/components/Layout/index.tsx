import styled from '@emotion/styled';
import { DefaultContainer } from '../../../styles/global';
import { Footer } from './Footer';
import { Header } from './Header';

export const Layout = ({ children, onClick, btnName }: any) => {
  return (
    <DefaultContainer>
      <Header btnName={btnName} onClick={onClick} />
      {children}
      <Footer />
    </DefaultContainer>
  );
};
