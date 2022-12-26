import { Logo } from './Logo';
import { Main } from './Main';
import styled from '@emotion/styled';
import { ThemeBtn } from './Btn/Theme';
import { UnLogged } from './Login/UnLogged';
import { LoginAvatar } from './Login/Avatar';
import { Flex } from '../../../styles/global';
import { Dispatch, SetStateAction } from 'react';
import { useUser } from '../../libs/client/useUser';
import { AnimatePresence, motion } from 'framer-motion';
import { useResponsive } from '../../libs/client/useTools';

interface IHeader {
  _data: {
    theme: boolean;
    setTheme: Dispatch<SetStateAction<boolean>>;
  };
}
export const Header = ({ _data }: IHeader) => {
  const { isLoggedIn } = useUser();
  const { theme, setTheme } = _data;
  const { isDesk, isMobile } = useResponsive();
  const _res = { theme, isDesk, isMobile };
  return (
    <AnimatePresence>
      <Cont
        custom={theme}
        variants={vars}
        animate="animate"
        initial="initial"
        className="header"
      >
        <Wrap>
          <Left>
            <Logo _res={_res} />
            {isDesk && <Main _res={_res} />}
          </Left>
          <Right>
            <ThemeBtn theme={theme} setTheme={setTheme} />
            <UnLogged isLoggedIn={isLoggedIn} _res={_res} />
            <LoginAvatar _res={_res} />
          </Right>
        </Wrap>
      </Cont>
    </AnimatePresence>
  );
};
const Cont = styled(motion.header)`
  font-size: 2rem;
  padding: 1.5rem 1rem;
  box-shadow: ${(p) => p.theme.boxShadow.input};
`;
const Wrap = styled(Flex)`
  justify-content: space-between;
`;
const Left = styled(Flex)`
  width: fit-content;
  justify-content: space-between;
  .logo {
  }
  .menu {
    gap: 2rem;
    width: fit-content;
  }
`;
const Right = styled(Left)`
  gap: 2rem;
  width: fit-content;
  justify-content: flex-end;
`;
const vars = {
  animate: (theme: boolean) => ({
    borderBottom: theme ? '1px solid transparent' : '1px solid #636e72',
  }),
};
