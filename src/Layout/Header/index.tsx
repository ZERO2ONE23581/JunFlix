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
        <Flex>
          <ThemeBtn theme={theme} setTheme={setTheme} />
          <LoginMenu theme={theme} />
        </Flex>
      </Wrap>
    </Cont>
  );
};
const Cont = styled(motion.header)`
  gap: 3rem;
  font-size: 1.3rem;
  margin-bottom: 5px;
  padding: 0.5rem 12rem;
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
    justify-content: flex-start;
    .main-menu {
      width: 100%;
      gap: 2rem;
    }
  }
`;
const headerVar = {
  animate: (dark: boolean) => ({
    borderBottom: dark ? greyBrdr : '1px solid transparent',
  }),
};
