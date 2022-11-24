import { Svg } from '../Svg';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { border, TransBorder, TweenTrans } from '../../../styles/variants';
import { useGetUser } from '../../libs/client/useUser';

export interface IAvatar {
  _data: {
    size: string;
    theme: boolean;
    isRound?: boolean;
    host_id: number | null;
    preview?: string | null;
    onAvatar?: () => void;
    onMyPage: boolean;
  };
}
export const Avatar = ({ _data }: IAvatar) => {
  const { onMyPage, size, theme, isRound, host_id, onAvatar, preview } = _data;
  const router = useRouter();
  const [image, setImage] = useState('');
  const { avatar, username } = useGetUser(host_id!);

  useEffect(() => {
    if (preview) return setImage(preview);
    if (avatar) {
      return setImage(avatarLink(avatar));
    }
  }, [avatar, preview, setImage, host_id]);
  const onClick = () => {
    if (onMyPage) return router.push(`/user/${host_id}/${username}/page`);
  };
  const isAvatar = Boolean(avatar || preview);

  return (
    <AnimatePresence initial={false}>
      {isAvatar && (
        <IsAvatar
          exit="exit"
          size={size}
          image={image}
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="avatar"
          variants={vars}
          transition={TweenTrans}
          custom={{ theme, isRound }}
          onClick={onAvatar ? onAvatar : onClick}
        />
      )}
      {!isAvatar && (
        <NoAvatar
          exit="exit"
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="avatar"
          size={size}
          variants={vars}
          onClick={onClick}
          custom={{ theme, isRound }}
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
const vars = {
  exit: () => ({ opacity: 0 }),
  initial: () => ({ opacity: 0 }),
  animate: ({ theme, isRound }: any) => ({
    opacity: 1,
    outline: border(theme),
    transition: { duration: 0.5 },
    borderRadius: isRound ? '100%' : '15%',
  }),
  hover: () => ({
    borderRadius: '100%',
    transition: { duration: 0.5 },
    outline: '3px solid #E50914',
  }),
};
export const avatarLink = (url: string | any) => {
  const no_img = '/img/1.jpg';
  const variant = 'public';
  const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
  if (!Boolean(url)) return no_img;
  else return `${base}/${url}/${variant}`;
};
