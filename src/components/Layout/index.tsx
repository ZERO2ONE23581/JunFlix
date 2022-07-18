import { Header } from './Header';
import { Footer } from './Footer';
import { ReactElement } from 'react';
import styled from '@emotion/styled';
import { Btns, IBtns } from './Btns';

interface ILayoutProps extends IBtns {
  children: ReactElement;
}
export const Layout = ({ children, setTheme, isLight }: ILayoutProps) => {
  return (
    <Cont>
      <Header />
      <section className="children">{children}</section>
      <Footer />
      <Btns isLight={isLight} setTheme={setTheme} />
    </Cont>
  );
};
const Cont = styled.section`
  background-color: ${(p) => p.theme.color.bg};
`;
