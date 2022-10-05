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
        <div className="logged-in">
          <UserIcon
            theme={theme}
            setModal={setModal}
            avatar={loggedInUser?.avatar}
          />
          <UserMenuModal modal={modal} setModal={setModal} />
        </div>
      )}
      {!isLoggedIn && (
        <div className="unlogged-in">
          <motion.span
            whileHover={textHover}
            onClick={() => router.push(`/login`)}
          >
            Login
          </motion.span>
          <motion.span
            whileHover={textHover}
            onClick={() => router.push(`/join`)}
          >
            Join
          </motion.span>
        </div>
      )}
    </Cont>
  );
};

const Cont = styled.article`
  > div {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .logged-in {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .unlogged-in {
  }
`;
