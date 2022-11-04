import { Logo } from './Logo';
import { MainMenu } from './Menu';
import { LoginMenu } from './Login';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Flex } from '../../../styles/global';
import { Dispatch, SetStateAction } from 'react';
import { ThemeBtn } from '../../Tools/Button/Theme';
import { greyBrdr } from '../../../styles/variants';

interface IHeader {
  theme: boolean;
  setTheme: Dispatch<SetStateAction<boolean>>;
}

export const Header = ({ theme, setTheme }: IHeader) => {
  return (
    <Cont
      animate="animate"
      initial="initial"
      className="header"
      variants={headerVar}
      custom={{ theme, isBorder: true }}
    >
      <Wrap className="wrap">
        <Flex className="logo_main">
          <Logo />
          <MainMenu theme={theme} />
        </Flex>
        <Flex className="theme-login">
          <ThemeBtn theme={theme} setTheme={setTheme} />
          <LoginMenu theme={theme} />
        </Flex>
      </Wrap>
    </Cont>
  );
};
const Cont = styled(motion.header)`
  .theme-login {
    //border: 2px solid crimson;
    min-width: 8rem;
    height: fit-content;
    justify-content: space-between;
  }
  gap: 3rem;
  font-size: 1.3rem;
  margin-bottom: 5px;
  padding: 1.3rem 12rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${(p) => p.theme.boxShadow.input};
  .logo {
    //border: 2px solid yellow;
  }
`;
const Wrap = styled(Flex)`
  justify-content: space-between;
  padding: 0 1rem;
  > div {
    gap: 2rem;
    width: fit-content;
  }
  .logo_main {
    width: 60%;
    max-width: 40vw;
    justify-content: flex-start;
    .main-menu {
      gap: 2rem;
      width: 100%;
    }
  }
`;
const headerVar = {
  animate: (dark: boolean) => ({
    borderBottom: dark ? greyBrdr : '1px solid transparent',
  }),
};
