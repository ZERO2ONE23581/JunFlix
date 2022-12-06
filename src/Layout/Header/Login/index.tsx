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
        <UserIcon className="logged-in">
          <Avatar
            _data={{
              size,
              theme,
              host_id,
              isOther: true,
              handleClick: onAvatar,
            }}
          />
          <IconModal modal={modal} setModal={setModal} theme={theme} />
        </UserIcon>
      )}

      {!isLoggedIn && (
        <LoginJoin className="unlogged-in">
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
            onClick={() => router.push(`/join`)}
          >
            Join
          </Text>
        </LoginJoin>
      )}
    </Cont>
  );
};
const Cont = styled.article``;
const UserIcon = styled(Flex)`
  border: 5px solid blue;
  position: relative;
  .avatar {
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
  }
`;
const LoginJoin = styled(Flex)`
  gap: 5rem;
`;

const Text = styled(motion.span)`
  cursor: pointer;
`;
