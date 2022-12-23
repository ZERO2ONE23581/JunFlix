import { Header } from './Header';
import { Footer } from './Footer';
import styled from '@emotion/styled';
import { Main } from './Header/Main';
import { Page } from '../../styles/global';
import { IResponsive } from '../types/global';
import { noneBorderVar } from '../../styles/variants';
import { Dispatch, ReactElement, SetStateAction } from 'react';

interface ILayoutProps extends IResponsive {
  children: ReactElement;
  _data: {
    hide: boolean;
    setFixed: Dispatch<SetStateAction<boolean>>;
    setTheme: Dispatch<SetStateAction<boolean>>;
  };
}
export const Layout = ({ _data, children, _res }: ILayoutProps) => {
  const { theme, isDesk, isMobile } = _res;
  const { hide, setTheme, setFixed } = _data;
  const isFooter = Boolean(!hide && isDesk);
  const isMenu = Boolean(!hide && isMobile);
  return (
    <>
      <Cont
        exit="exit"
        animate="animate"
        initial="initial"
        custom={theme}
        variants={noneBorderVar}
      >
        {!hide && <Header _data={{ theme, setTheme, setFixed }} />}
        <section className="children">{children}</section>
        {isMenu && <Main setFixed={setFixed} _res={_res} />}
        {isFooter && <Footer />}
      </Cont>
    </>
  );
};

const Cont = styled(Page)`
  padding: 0;
  width: 100vw;
  min-width: 768px;
`;
