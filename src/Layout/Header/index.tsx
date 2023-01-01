import { Logo } from '../Logo';
import { Main } from './Main';
import styled from '@emotion/styled';
import { ThemeBtn } from './ThemeBtn';
import { Dispatch, SetStateAction } from 'react';
import { Flex, Flex_, Mob } from '../../../styles/global';
import { useUser } from '../../libs/client/useUser';
import { AnimatePresence, motion } from 'framer-motion';
import { useResponsive } from '../../libs/client/useTools';
import { UnLogged } from './UnLogged';
import { LoginAvatar } from './LoginAvatar';

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
          <Wrap className="wrap">
            <Left className="left">
              <Logo _res={_res} />
              {isDesk && <Main _res={_res} />}
            </Left>
            <Right className="right" isDesk={isDesk}>
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
    padding: ${(p) => (p.isDesk ? '0.5rem 1rem' : '2rem')};
    .wrap {
      padding-left: ${(p) => p.isDesk && '10rem'};
      padding-right: ${(p) => p.isDesk && '2rem'};
      .left {
        gap: 10rem;
        .menu {
          gap: 10rem;
          font-size: 1.5rem;
        }
      }
      .right {
        width: fit-content;
      }
    }
    button {
      font-size: ${(p) => (p.isDesk ? '1.2rem' : '2.5rem')};
    }
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
const Right = styled(Flex_)`
  width: fit-content;
  justify-content: flex-end;
  gap: ${(p) => p.isDesk && '1rem'};
`;
const vars = {
  animate: (theme: boolean) => ({
    borderBottom: theme ? '1px solid transparent' : '1px solid #636e72',
  }),
};
