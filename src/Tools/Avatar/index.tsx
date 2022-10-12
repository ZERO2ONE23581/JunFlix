import styled from '@emotion/styled';
import { Svg } from '../Svg';
import { useEffect, useState } from 'react';
import { ITheme } from '../../../styles/theme';
import { AnimatePresence, motion } from 'framer-motion';
import { border, color, duration, TweenTrans } from '../../../styles/variants';

interface IUserAvatar extends ITheme {
  info: {
    size?: string;
    avatar?: string | null;
    preview?: string;
  };
  onClick?: () => void;
}

export const UserAvatar = ({ info, onClick, theme }: IUserAvatar) => {
  const [img, setImg] = useState('');
  useEffect(() => {
    if (info.preview) return setImg(info.preview);
    if (info.avatar) {
      const variant = 'public';
      const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
      const avatar = `${base}/${info.avatar}/${variant}`;
      return setImg(avatar);
    }
  }, [info, setImg]);
  //
  const isAvatar = Boolean(info.avatar || info.preview);
  return (
    <AnimatePresence initial={false}>
      {isAvatar && (
        <Cont
          img={img}
          size={info.size}
          onClick={onClick}
          className="user-avatar"
          exit="exit"
          initial="initial"
          animate="animate"
          whileHover="hover"
          variants={avatarVar}
          transition={TweenTrans}
          custom={{ theme, isPreview: info.preview }}
        />
      )}
      {!isAvatar && (
        <Circle
          size={info.size!}
          onClick={onClick}
          exit="exit"
          initial="initial"
          animate="animate"
          whileHover="hover"
          variants={avatarVar}
        >
          <Svg theme={theme} type="user" />
        </Circle>
      )}
    </AnimatePresence>
  );
};
const Circle = styled(motion.div)<{ size: string }>`
  border-radius: 100%;
  width: ${(p) => p.size && p.size};
  height: ${(p) => p.size && p.size};
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 60%;
    height: 60%;
  }
`;
const Cont = styled(motion.div)<{ img?: string; size?: string }>`
  cursor: pointer;
  border-radius: 100%;
  width: ${(p) => p.size && p.size};
  height: ${(p) => p.size && p.size};
  background: ${(p) => p.img && `url(${p.img}) center / cover no-repeat`};
`;
const avatarVar = {
  initial: (theme: boolean) => ({
    opacity: 0,
    transition: duration(0.4),
    border: theme ? '1px solid #ffffff' : '1px solid transparent',
  }),
  animate: (theme: boolean) => ({
    opacity: 1,
    transition: duration(0.4),
    border: theme ? '1px solid #ffffff' : '1px solid transparent',
  }),
  exit: (theme: boolean) => ({
    opacity: 0,
    border: theme ? '1px solid #ffffff' : '1px solid transparent',
  }),
  hover: {
    scale: 1.2,
    borderWidth: '3px',
    transition: duration(0.4),
    borderColor: '#E50914',
  },
};
