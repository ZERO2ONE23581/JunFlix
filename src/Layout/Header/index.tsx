import { Logo } from './Logo';
import { Main } from './Main';
import styled from '@emotion/styled';
import { ThemeBtn } from './Btn/Theme';
import { UnLogged } from './Login/UnLogged';
import { LoginAvatar } from './Login/Avatar';
import { Dispatch, SetStateAction } from 'react';
import { Flex, Mob } from '../../../styles/global';
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
      <Cont isDesk={isDesk}>
        <Header_
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
        </Header_>
      </Cont>
    </AnimatePresence>
  );
};
const Cont = styled(Mob)`
  .header {
    button {
      font-size: ${(p) => (p.isDesk ? '2.2rem' : '2.7rem')};
    }
    padding: ${(p) => (p.isDesk ? '1.5rem 1rem' : '2rem')};
  }
`;
const Header_ = styled(motion.header)`
  box-shadow: ${(p) => p.theme.boxShadow.input};
`;
const Wrap = styled(Flex)`
  justify-content: space-between;
`;
const Left = styled(Flex)`
  width: fit-content;
  justify-content: space-between;
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
