import { Svg } from './Svg';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TransBorder, TweenTrans } from '../../styles/variants';

export interface IAvatar {
  _data: {
    size: string;
    theme: boolean;
    isRound?: boolean;
    handleClick?: {
      isClick: boolean;
      onClick: () => void;
    };
    host_id: number;
    avatar: string | null;
    preview: string | null;
  };
}
export const Avatar = ({ _data }: IAvatar) => {
  const size = _data?.size!;
  const theme = _data?.theme!;
  const avatar = _data?.avatar!;
  const isRound = _data?.isRound!;
  const host_id = _data?.host_id!;
  const preview = _data?.preview!;

  const router = useRouter();
  const [image, setImage] = useState('');
  const isAvatar = Boolean(avatar || preview);

  useEffect(() => {
    if (preview) return setImage(preview);
    if (avatar) {
      const variant = 'public';
      const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
      const Avatar = `${base}/${avatar}/${variant}`;
      return setImage(Avatar);
    }
  }, [avatar, preview, setImage]);

  const onClick = () => {
    const handleClick = _data?.handleClick!;
    if (handleClick?.isClick) return handleClick?.onClick();
    if (host_id) return router.push(`/user/${host_id}/my_page`);
  };
  //
  return (
    <AnimatePresence initial={false}>
      {isAvatar && (
        <IsAvatar
          size={size!}
          image={image}
          onClick={onClick}
          exit="exit"
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="avatar"
          custom={{ theme }}
          transition={TweenTrans}
          variants={isRound ? circleTypeVar : avatarVar}
        />
      )}
      {!isAvatar && (
        <NoAvatar
          size={size!}
          onClick={onClick}
          exit="exit"
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="avatar"
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
  border-radius: 100%;
  width: ${(p) => p.size && p.size};
  height: ${(p) => p.size && p.size};
  background: ${(p) => p.image && `url(${p.image}) center / cover no-repeat`};
`;
const NoAvatar = styled(motion.div)<{ size: string }>`
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
const avatarVar = {
  initial: (theme: boolean) => ({
    opacity: 0,
  }),
  animate: (theme: boolean) => ({
    opacity: 1,
    borderRadius: '10%',
    border: TransBorder(theme),
    transition: { duration: 0.5 },
  }),
  exit: (theme: boolean) => ({
    opacity: 0,
    transition: { duration: 0.5 },
  }),
  hover: (theme: boolean) => ({
    scale: 1.2,
    borderWidth: '3px',
    borderRadius: '100%',
    borderColor: '#E50914',
    transition: { duration: 0.5 },
  }),
};
const circleTypeVar = {
  initial: (theme: boolean) => ({
    opacity: 0,
  }),
  animate: (theme: boolean) => ({
    opacity: 1,
    border: TransBorder(theme),
    transition: { duration: 0.5 },
  }),
  exit: (theme: boolean) => ({
    opacity: 0,
    transition: { duration: 0.5 },
  }),
  hover: (theme: boolean) => ({
    scale: 1.2,
    borderWidth: '3px',
    borderColor: '#E50914',
    transition: { duration: 0.5 },
  }),
};
export const avatarLink = (url: string | any) => {
  const no_img = '/img/1.jpg';
  const variant = 'public';
  const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
  if (!Boolean(url)) return no_img;
  else return `${base}/${url}/${variant}`;
};
