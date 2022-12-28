import { Header } from './Header';
import { Footer } from './Footer';
import styled from '@emotion/styled';
import { Main } from './Header/Main';
import { motion } from 'framer-motion';
import { IResponsive } from '../types/global';
import { noneBorderVar } from '../../styles/variants';
import { Dispatch, ReactElement, SetStateAction } from 'react';

interface ILayoutProps extends IResponsive {
  children: ReactElement;
  _data: {
    hide: boolean;
    setTheme: Dispatch<SetStateAction<boolean>>;
  };
}
export const Layout = ({ _data, children, _res }: ILayoutProps) => {
  const { hide, setTheme } = _data;
  const { theme, isDesk, isMobile } = _res;
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
        {!hide && <Header _data={{ theme, setTheme }} />}
        <section className="children">{children}</section>
        {isMenu && <Main _res={_res} />}
        {isFooter && <Footer />}
      </Cont>
    </>
  );
};
const Cont = styled(motion.section)`
  padding: 0;
  width: 100%;
  min-width: 700px;
  position: relative;
`;
