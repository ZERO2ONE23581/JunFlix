import { useState } from 'react';
import styled from '@emotion/styled';
import { ListWrap } from './ListWrap';
import { useRouter } from 'next/router';
import useUser from '../../../libs/client/useUser';
import { Overlay } from '../../../../styles/global';
import { AnimatePresence, motion } from 'framer-motion';
import { UserIcon } from './userIcon';
import { UserMenuModal } from './modal';
import { ITheme } from '../../../../styles/theme';

export const UserMenu = ({ theme }: ITheme) => {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const { isLoggedIn, loggedInUser } = useUser();
  const textHover = {
    scale: 1.25,
    color: '#E50914',
  };
  return (
    <Cont className="user-menu">
      {isLoggedIn && (
        <>
          <UserIcon
            theme={theme}
            setModal={setModal}
            avatar={loggedInUser?.avatar}
          />
          <UserMenuModal modal={modal} setModal={setModal} />
        </>
      )}
      {!isLoggedIn && (
        <LoginMenu className="login-menu">
          <motion.span
            whileHover={textHover}
            onClick={() => router.push(`/join`)}
          >
            Join
          </motion.span>
          <motion.span
            whileHover={textHover}
            onClick={() => router.push(`/login`)}
          >
            Join
          </motion.span>
        </LoginMenu>
      )}
    </Cont>
  );
};

const Cont = styled.article`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LoginMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Modal = styled(motion.div)`
  z-index: 999;
  top: 60%;
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
  border-radius: 5px;
  color: ${(p) => p.theme.color.font};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
  border: 2px solid ${(p) => p.theme.color.font};
  ul {
    padding: 5px 0;
    min-width: 10em;
  }
`;
const Text = styled(motion.div)`
  cursor: pointer;
`;
