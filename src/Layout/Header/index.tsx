import { Logo } from './Logo';
import { Main } from './Main';
import { LoginMenu } from './Login';
import styled from '@emotion/styled';
import { ThemeBtn } from './Btn/Theme';
import { Flex } from '../../../styles/global';
import { Dispatch, SetStateAction } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface IHeader {
  _data: {
    theme: boolean;
    setTheme: Dispatch<SetStateAction<boolean>>;
    setFixed: Dispatch<SetStateAction<boolean>>;
  };
}
export const Header = ({ _data }: IHeader) => {
  const { theme, setTheme, setFixed } = _data;
  return (
    <AnimatePresence>
      <Cont
        custom={theme}
        variants={vars}
        animate="animate"
        initial="initial"
        className="header"
      >
        <Flex className="wrap">
          <Left>
            <Logo />
            <Main theme={theme} setFixed={setFixed} />
          </Left>
          <Right>
            <ThemeBtn theme={theme} setTheme={setTheme} />
            <LoginMenu theme={theme} />
          </Right>
        </Flex>
      </Cont>
    </AnimatePresence>
  );
};
const Cont = styled(motion.header)`
  font-size: 1.3rem;
  box-shadow: ${(p) => p.theme.boxShadow.input};
  .wrap {
    padding: 0 1rem;
    justify-content: space-between;
  }
`;
const Left = styled(Flex)`
  gap: 1rem;
  width: fit-content;
  height: fit-content;
`;
const Right = styled(Left)``;
const vars = {
  animate: (theme: boolean) => ({
    borderBottom: theme ? '1px solid transparent' : '1px solid #636e72',
  }),
};
