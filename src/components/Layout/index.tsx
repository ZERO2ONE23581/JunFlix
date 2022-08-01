import { Header } from './Header';
import { Footer } from './Footer';
import { ReactElement } from 'react';
import styled from '@emotion/styled';
import { Fixed, IBtns } from './Fixed';

interface ILayoutProps extends IBtns {
  children: ReactElement;
}
export const Layout = ({ children, setTheme, isLight }: ILayoutProps) => {
  return (
    <Cont>
      <Header />
      <Children>{children}</Children>
      <Footer />
      <Fixed isLight={isLight} setTheme={setTheme} />
    </Cont>
  );
};
const Cont = styled.section`
  min-width: 1500px;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
`;
const Children = styled.section``;
