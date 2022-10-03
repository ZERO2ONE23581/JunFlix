import { useState } from 'react';
import styled from '@emotion/styled';
import { ListWrap } from './ListWrap';
import { useRouter } from 'next/router';
import { UserAvatar } from './userAvatar';
import useUser from '../../../../libs/client/useUser';
import { Overlay } from '../../../../../styles/global';
import { AnimatePresence, motion } from 'framer-motion';
import { menuModalVar, TweenTrans } from '../../../../../styles/variants';

export const LoginMenu = () => {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const { isLoggedIn, loggedInUser } = useUser();
  const textHover = {
    scale: 1.25,
    color: '#E50914',
  };
  return (
    <Cont className="login-menu">
      {isLoggedIn && (
        <>
          <UserAvatar avatar={loggedInUser?.avatar} setModal={setModal} />
          <AnimatePresence>
            {modal && (
              <>
                <Modal
                  exit="exit"
                  initial="initial"
                  animate="animate"
                  variants={menuModalVar}
                  transition={TweenTrans}
                  onClick={() => setModal((p) => !p)}
                >
                  <ListWrap />
                </Modal>
                <Overlay
                  className="overlay"
                  animate={{ opacity: 1 }}
                  onClick={() => setModal(false)}
                  exit={{ opacity: 0, transition: { duration: 0.5 } }}
                />
              </>
            )}
          </AnimatePresence>
        </>
      )}
      {!isLoggedIn && (
        <>
          <NotLogged className="isNotLogged">
            <Text whileHover={textHover} onClick={() => router.push(`/join`)}>
              <span>Join</span>
            </Text>

            <Text whileHover={textHover} onClick={() => router.push(`/login`)}>
              <span>Login</span>
            </Text>
          </NotLogged>
        </>
      )}
    </Cont>
  );
};

const Cont = styled.article`
  position: relative;
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
const NotLogged = styled.div`
  gap: 3em;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Text = styled(motion.div)`
  cursor: pointer;
`;
