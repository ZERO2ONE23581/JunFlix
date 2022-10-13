import { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { UserMenuModal } from './modal';
import { ITheme } from '../../../../styles/theme';
import useUser from '../../../libs/client/useUser';
import { Avatar } from '../../../Tools/Avatar';
import { colorVar, hoverScale } from '../../../../styles/variants';

export const UserMenu = ({ theme }: ITheme) => {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const { isLoggedIn, loggedInUser } = useUser();
  const item = {
    theme,
    size: '4rem',
    preview: null,
    avatar: loggedInUser?.avatar!,
    onClick: () => setModal((p) => !p),
  };
  //
  const textVar = { ...colorVar, ...hoverScale };
  return (
    <Cont className="user-menu">
      {isLoggedIn && (
        <div className="logged-in">
          <Avatar item={{ ...item }} />
          <UserMenuModal modal={modal} setModal={setModal} theme={theme} />
        </div>
      )}
      {!isLoggedIn && (
        <div className="unlogged-in">
          <Text
            exit="exit"
            initial="initial"
            animate="animate"
            whileHover={'hover'}
            custom={theme}
            variants={textVar}
            onClick={() => router.push(`/login`)}
          >
            Login
          </Text>
          <Text
            exit="exit"
            initial="initial"
            animate="animate"
            whileHover={'hover'}
            custom={theme}
            variants={textVar}
            onClick={() => router.push(`/user/create`)}
          >
            Join
          </Text>
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
  }
  .logged-in {
    position: relative;
  }
`;
const Text = styled(motion.span)``;
