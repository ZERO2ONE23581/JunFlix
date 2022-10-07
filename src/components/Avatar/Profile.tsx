import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { ITheme } from '../../../styles/theme';
import { AnimatePresence, motion } from 'framer-motion';

interface IProfile extends ITheme {
  size?: string;
  type: {
    preview?: string;
    avatar?: string | null;
  };
  onClick?: () => void;
}
export const ProfileAvatar = ({ size, type, onClick, theme }: IProfile) => {
  const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
  const variant = 'public';
  const [url, setUrl] = useState('');
  useEffect(() => {
    if (type.avatar) setUrl(`${base}/${type.avatar}/${variant}`);
    if (type.preview) setUrl(type.preview);
  }, [setUrl, url, type]);

  const avatarVar = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
    },
  };
  const svgVar = {
    initial: (theme: boolean) => ({
      opacity: 0,
    }),
    animate: (theme: boolean) => ({
      opacity: 1,
      transition: { duration: 0.3 },
    }),
    exit: (theme: boolean) => ({ opacity: 0, transition: { duration: 0.3 } }),
  };
  const pathVar = {
    initial: (theme: boolean) => ({
      fill: theme ? '#000000' : '#ffffff',
    }),
    animate: (theme: boolean) => ({
      transition: { duration: 0.3 },
      fill: theme ? '#000000' : '#ffffff',
    }),
    hover: { fill: '#E50914' },
  };
  const isNoImg = Boolean(!type.avatar && !type.preview);
  return (
    <AnimatePresence>
      {!isNoImg && (
        <Cont
          url={url}
          size={size!}
          onClick={onClick}
          className="profile-avatar"
          //
          exit="exit"
          initial="initial"
          animate="animate"
          variants={avatarVar}
          transition={{ type: 'spring', stiffness: 100 }}
        />
      )}
      {isNoImg && (
        <Svg
          exit="exit"
          initial="initial"
          animate="animate"
          variants={svgVar}
          size={size!}
          viewBox="0 0 512 512"
        >
          <motion.path
            exit="exit"
            initial="initial"
            animate="animate"
            custom={theme}
            variants={pathVar}
            whileHover="hover"
            d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c39.77 0 72 32.24 72 72S295.8 272 256 272c-39.76 0-72-32.24-72-72S216.2 128 256 128zM256 448c-52.93 0-100.9-21.53-135.7-56.29C136.5 349.9 176.5 320 224 320h64c47.54 0 87.54 29.88 103.7 71.71C356.9 426.5 308.9 448 256 448z"
          />
        </Svg>
      )}
    </AnimatePresence>
  );
};
const Svg = styled(motion.svg)<{ size: string }>`
  width: ${(p) => (p.size ? `${p.size}` : '1em')};
  height: ${(p) => (p.size ? `${p.size}` : '1em')};
`;
const Cont = styled(motion.div)<{ url?: string; size: string }>`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  width: ${(p) => p.size && `${p.size}`};
  height: ${(p) => p.size && `${p.size}`};
  background: ${(p) => p.url && `url(${p.url}) center / cover no-repeat`};
`;
export const Label = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    display: none;
  }
`;
