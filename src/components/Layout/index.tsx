import { Footer } from './Footer';
import styled from '@emotion/styled';
import { Header } from './Header/Header';
import { ReactElement } from 'react';

interface ILayoutProps {
  btnName: string;
  onClick: () => void;
  children: ReactElement;
}

export const Layout = ({ children, onClick, btnName }: ILayoutProps) => {
  return (
    <Cont>
      <Header theme={btnName} themeClick={onClick} />
      <section className="children">{children}</section>
      <Footer />
    </Cont>
  );
};
const Cont = styled.section`
  font-size: 1.3rem;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
`;
