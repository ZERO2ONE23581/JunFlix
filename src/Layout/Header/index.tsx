import { Logo } from './Logo';
import { MainMenu } from './Menu';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { LoginMenu } from './Login';
import { ThemeBtn } from '../../Tools/Button/Theme';
import { Dispatch, SetStateAction } from 'react';
import { Flex } from '../../../styles/global';
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
      <Logo />
      <Flex className="flex">
        <MainMenu theme={theme} />
        <LoginMenu theme={theme} />
      </Flex>
      <ThemeBtn theme={theme} setTheme={setTheme} />
    </Cont>
  );
};
const Cont = styled(motion.header)`
  padding: 0 4rem;
  gap: 3rem;
  display: flex;
  font-size: 1.3em;
  margin-bottom: 5px;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${(p) => p.theme.boxShadow.input};
  //border: 2px solid yellow;
  .logo {
    //border: 5px solid cornflowerblue;
  }
  .flex {
    width: 100%;
    min-width: 620px;
    justify-content: space-between;

    .main-menu {
      width: 60%;
    }
    .user-menu {
      //border: 2px solid red;
      .logged-in {
        //border: 2px solid yellow;
      }
      .unlogged-in {
        //border: 2px solid yellow;
      }
    }
    span {
      cursor: pointer;
    }
  }
`;
const headerVar = {
  animate: (dark: boolean) => ({
    borderBottom: dark ? greyBrdr : '1px solid transparent',
  }),
};
