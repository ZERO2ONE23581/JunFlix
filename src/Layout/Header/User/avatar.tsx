import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { ITheme } from '../../../../styles/theme';
import { Svg } from '../../../Tools/Svg';

interface IUserAvatar extends ITheme {
  avatar?: string | null;
  setModal: Dispatch<SetStateAction<boolean>>;
}

export const UserAvatarIcon = ({ avatar, setModal, theme }: IUserAvatar) => {
  const variant = 'public';
  const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
  const url = `${base}/${avatar}/${variant}`;
  const avatarVar = {
    initial: (theme: boolean) => ({
      opacity: 0,
      border: theme ? '1px solid #ffffff' : '1px solid #000000',
    }),
    animate: (theme: boolean) => ({
      opacity: 1,
      transition: { duration: 0.3 },
      border: theme ? '1px solid #ffffff' : '1px solid #000000',
    }),
    exit: (theme: boolean) => ({
      opacity: 0,
      transition: { duration: 0.3 },
    }),
    hover: {
      scale: 1.3,
      borderRadius: '100%',
      border: '3px solid #E50914',
      transition: {
        duration: 0.3,
      },
    },
  };
  const noAvatarVar = {
    initial: (theme: boolean) => ({
      opacity: 0,
      backgroundColor: theme ? '#000000' : '#ffffff',
      border: theme ? '1px solid #ffffff' : '1px solid #000000',
    }),
    animate: (theme: boolean) => ({
      opacity: 1,
      transition: { duration: 0.3 },
      backgroundColor: theme ? '#000000' : '#ffffff',
      border: theme ? '1px solid #ffffff' : '1px solid #000000',
    }),
    exit: (theme: boolean) => ({
      opacity: 0,
      transition: { duration: 0.3 },
    }),
    hover: {
      scale: 1.1,
      borderRadius: '100%',
      border: '1px solid #E50914',
      backgroundColor: '#E50914',
      transition: {
        duration: 0.3,
      },
    },
  };
  return (
    <>
      {avatar && (
        <Cont
          url={url}
          exit="exit"
          initial="initial"
          animate="animate"
          whileHover={'hover'}
          custom={!theme}
          variants={avatarVar}
          className="loggedIn-profile"
          onClick={() => setModal((p) => !p)}
          transition={{ type: 'spring', stiffness: 100 }}
        />
      )}
      {!avatar && (
        <NoAvatar
          exit="exit"
          initial="initial"
          animate="animate"
          custom={!theme}
          variants={noAvatarVar}
          whileHover={'hover'}
          className="no-avatar"
          onClick={() => setModal((p) => !p)}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <Svg size="2rem" theme={theme} type="user" />
        </NoAvatar>
      )}
    </>
  );
};
const Cont = styled(motion.div)<{ url?: string }>`
  width: 3em;
  height: 3em;
  cursor: pointer;
  border-radius: 20%;
  background: ${(p) => p.url && `url(${p.url}) center / cover no-repeat`};
`;
const NoAvatar = styled(motion.div)`
  width: 3.1rem;
  height: 3.1rem;
  cursor: pointer;
  border-radius: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    pointer-events: none;
  }
`;
