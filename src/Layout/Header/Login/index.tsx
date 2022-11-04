import { useState } from 'react';
import { IconModal } from './Modal';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Avatar } from '../../../Tools/Avatar';
import { Flex } from '../../../../styles/global';
import { ITheme } from '../../../../styles/theme';
import { useUser } from '../../../libs/client/useUser';
import { colorVar, hoverScale } from '../../../../styles/variants';

export const LoginMenu = ({ theme }: ITheme) => {
  const size = '3rem';
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const onAvatar = () => setModal((p) => !p);
  const textVar = { ...colorVar, ...hoverScale };
  const { isLoggedIn, user_id: host_id } = useUser();
  return (
    <Cont className="user-menu">
      {isLoggedIn && (
        <Flex className="logged-in">
          <Avatar _data={{ size, theme, host_id, onAvatar }} />
          <IconModal modal={modal} setModal={setModal} theme={theme} />
        </Flex>
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
  }
  .logged-in {
    position: relative;
  }
`;
const Text = styled(motion.span)``;
