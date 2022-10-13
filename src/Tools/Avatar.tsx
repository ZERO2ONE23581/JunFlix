import { Svg } from './Svg';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { due, TransBorder, TweenTrans } from '../../styles/variants';

interface IAvatar {
  item: {
    size: string;
    theme: boolean;
    onClick?: () => void;
    avatar: string | null;
    preview: string | null;
  };
}
export const Avatar = ({ item }: IAvatar) => {
  const size = item?.size;
  const theme = item?.theme;
  const avatar = item?.avatar;
  const onClick = item?.onClick;
  const preview = item?.preview;
  const custom = { theme, preview };
  const [image, setImage] = useState('');
  const isAvatar = Boolean(avatar || preview);
  //
  useEffect(() => {
    if (preview) return setImage(preview);
    if (avatar) {
      const variant = 'public';
      const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
      const Avatar = `${base}/${avatar}/${variant}`;
      return setImage(Avatar);
    }
  }, [avatar, preview, setImage]);
  //
  return (
    <AnimatePresence initial={false}>
      {isAvatar && (
        <IsAvatar
          size={size!}
          image={image}
          onClick={onClick}
          className="avatar"
          exit="exit"
          initial="initial"
          animate="animate"
          whileHover="hover"
          variants={avatarVar}
          custom={{ ...custom }}
          transition={TweenTrans}
        />
      )}
      {!isAvatar && (
        <NoAvatar
          size={size!}
          onClick={onClick}
          className="avatar"
          exit="exit"
          initial="initial"
          animate="animate"
          whileHover="hover"
          variants={avatarVar}
        >
          <Svg theme={theme} type="user" />
        </NoAvatar>
      )}
    </AnimatePresence>
  );
};
const IsAvatar = styled(motion.div)<{ image?: string; size: string }>`
  cursor: pointer;
  width: ${(p) => p.size && p.size};
  height: ${(p) => p.size && p.size};
  background: ${(p) => p.image && `url(${p.image}) center / cover no-repeat`};
`;
const NoAvatar = styled(motion.div)<{ size: string }>`
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

const avatarVar = {
  initial: (theme: boolean) => ({
    opacity: 0,
    borderRadius: '10%',
    transition: due(0.5),
    border: TransBorder(theme),
  }),
  animate: (theme: boolean) => ({
    opacity: 1,
    borderRadius: '10%',
    transition: due(0.5),
    border: TransBorder(theme),
  }),
  exit: (theme: boolean) => ({
    opacity: 0,
    transition: due(0.5),
    border: TransBorder(!theme),
  }),
  hover: {
    scale: 1.2,
    borderWidth: '3px',
    borderRadius: '100%',
    transition: due(0.5),
    borderColor: '#E50914',
  },
};
