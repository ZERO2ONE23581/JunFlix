import { Logo } from './Logo';
import { Main } from './Main';
import { IsLogged } from './Logged';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { NotLogged } from './NotLogged';
import { Flex } from '../../../styles/global';
import { Dispatch, SetStateAction } from 'react';
import { ThemeBtn } from '../../Tools/Button/Theme';

interface IHeader {
  theme: boolean;
  setTheme: Dispatch<SetStateAction<boolean>>;
}
export const Header = ({ theme, setTheme }: IHeader) => {
  return (
    <Cont
      custom={theme}
      variants={vars}
      animate="animate"
      initial="initial"
      className="header"
    >
      <Wrap className="wrap">
        <Flex className="left">
          <Logo />
          <Main theme={theme} />
        </Flex>
        <Flex className="right">
          <ThemeBtn theme={theme} setTheme={setTheme} />
          <IsLogged theme={theme} />
          <NotLogged theme={theme} />
        </Flex>
      </Wrap>
    </Cont>
  );
};
const Cont = styled(motion.header)`
  gap: 3rem;
  display: flex;
  font-size: 1.3rem;
  margin-bottom: 5px;
  align-items: center;
  padding: 1.3rem 12rem;
  justify-content: space-between;
  box-shadow: ${(p) => p.theme.boxShadow.input};
`;
const Wrap = styled(Flex)`
  padding: 0 1rem;
  justify-content: space-between;
  .right,
  .left {
    gap: 2rem;
    width: fit-content;
    height: fit-content;
  }
`;
const vars = {
  animate: (theme: boolean) => ({
    borderBottom: theme ? '1px solid transparent' : '1px solid #636e72',
  }),
};
