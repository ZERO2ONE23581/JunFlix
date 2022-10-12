import { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { UserMenuModal } from './modal';
import { ITheme } from '../../../../styles/theme';
import useUser from '../../../libs/client/useUser';
import { UserAvatar } from '../../../Tools/Avatar';
import { menuTextVar } from '../../../../styles/variants';

export const UserMenu = ({ theme }: ITheme) => {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const { isLoggedIn, loggedInUser } = useUser();
  //

  return (
    <Cont className="user-menu">
      {isLoggedIn && (
        <div className="logged-in">
          <UserAvatar
            theme={theme}
            onClick={() => setModal((p) => !p)}
            info={{ avatar: loggedInUser?.avatar, size: '4rem' }}
          />
          <UserMenuModal modal={modal} setModal={setModal} theme={theme} />
        </div>
      )}
      {!isLoggedIn && (
        <div className="unlogged-in">
          <motion.span
            exit="exit"
            initial="initial"
            animate="animate"
            whileHover={'hover'}
            className="login-text"
            custom={theme}
            variants={menuTextVar}
            onClick={() => router.push(`/login`)}
          >
            Login
          </motion.span>
          <motion.span
            exit="exit"
            initial="initial"
            animate="animate"
            whileHover={'hover'}
            className="login-text"
            custom={theme}
            variants={menuTextVar}
            onClick={() => router.push(`/user/create`)}
          >
            Join
          </motion.span>
        </div>
      )}
    </Cont>
  );
};
const Cont = styled.article`
  .unlogged-in {
    gap: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    .login-text {
    }
  }
  .logged-in {
    position: relative;
  }
`;
