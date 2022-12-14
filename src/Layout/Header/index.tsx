import { Logo } from './Logo';
import { Main } from './Main';
import { LoginMenu } from './Login';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { ThemeBtn } from './Btn/Theme';
import { Flex } from '../../../styles/global';
import { Dispatch, SetStateAction } from 'react';

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
      <Flex className="wrap">
        <Left>
          <Logo />
          <Main theme={theme} />
        </Left>
        <Right>
          <ThemeBtn theme={theme} setTheme={setTheme} />
          <LoginMenu theme={theme} />
        </Right>
      </Flex>
    </Cont>
  );
};
const Cont = styled(motion.header)`
  padding: 0 10rem;
  font-size: 1.3rem;
  box-shadow: ${(p) => p.theme.boxShadow.input};
  .wrap {
    padding: 0 1rem;
    justify-content: space-between;
  }
`;
const Left = styled(Flex)`
  gap: 2rem;
  width: fit-content;
  height: fit-content;
`;
const Right = styled(Left)``;
const vars = {
  animate: (theme: boolean) => ({
    borderBottom: theme ? '1px solid transparent' : '1px solid #636e72',
  }),
};
