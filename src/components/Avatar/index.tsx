import styled from '@emotion/styled';
import { Svg } from '../../Tools/Svg';
import { ITheme } from '../../../styles/theme';
import { AnimatePresence, motion } from 'framer-motion';
import { border, duration, TweenTrans } from '../../../styles/variants';

interface IUserAvatar extends ITheme {
  info: {
    size: string;
    avatar: string | null;
  };
  onClick: () => void;
}

export const UserAvatar = ({ info, onClick, theme }: IUserAvatar) => {
  const variant = 'public';
  const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
  const url = `${base}/${info.avatar}/${variant}`;
  //
  return (
    <AnimatePresence initial={false}>
      <Cont
        custom={!theme}
        variants={avatarVar}
        transition={TweenTrans}
        exit="exit"
        initial="initial"
        animate="animate"
        whileHover="hover"
        //
        url={url}
        size={info.size}
        onClick={onClick}
        className="user-avatar"
      >
        {!info.avatar && <Svg size="2rem" theme={theme} type="user" />}
      </Cont>
    </AnimatePresence>
  );
};
const avatarVar = {
  initial: (theme: boolean) => ({
    opacity: 0,
    border: border(theme),
    transition: duration(0.4),
  }),
  animate: (theme: boolean) => ({
    opacity: 1,
    border: border(theme),
    transition: duration(0.4),
  }),
  exit: (theme: boolean) => ({
    opacity: 0,
  }),
  hover: {
    scale: 1.2,
    borderWidth: '3px',
    transition: duration(0.4),
    borderColor: '#E50914',
  },
};
const Cont = styled(motion.div)<{ url?: string; size: string }>`
  cursor: pointer;
  border-radius: 100%;
  width: ${(p) => p.size && p.size};
  height: ${(p) => p.size && p.size};
  background: ${(p) => p.url && `url(${p.url}) center / cover no-repeat`};
`;
