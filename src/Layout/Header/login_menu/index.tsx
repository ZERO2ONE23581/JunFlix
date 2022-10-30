import { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { IconModal } from './Icon_Modal';
import { Avatar } from '../../../Tools/Avatar';
import { ITheme } from '../../../../styles/theme';
import { useUser } from '../../../libs/client/useUser';
import { colorVar, hoverScale } from '../../../../styles/variants';

export const LoginMenu = ({ theme }: ITheme) => {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const { isLoggedIn, loggedInUser } = useUser();
  const user = loggedInUser;
  //
  const textVar = { ...colorVar, ...hoverScale };
  return (
    <Cont className="user-menu">
      {isLoggedIn && (
        <div className="logged-in">
          <Avatar
            _data={{
              theme,
              size: '4rem',
              isClick: true,
              preview: null,
              avatar: user?.avatar!,
              onClick: () => setModal((p) => !p),
            }}
          />
          <IconModal modal={modal} setModal={setModal} theme={theme} />
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
