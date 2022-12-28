import { Svg } from '../Svg';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Flex } from '../../../styles/global';
import { border } from '../../../styles/variants';
import { useGetUser } from '../../libs/client/useUser';
import { AnimatePresence, motion } from 'framer-motion';

export const Avatar = ({ _data, _modal }: IAvatarInput) => {
  const router = useRouter();
  const { isRound, size, theme, host_id, isOther, handleClick } = _data;
  const { avatar, userId } = useGetUser(host_id);
  const onClick = () => {
    const isModal = _modal?.isModal!;
    const closeModal = _modal?.closeModal!;
    if (isModal) closeModal();
    if (isOther) return handleClick!();
    else return router.push(`/user/${host_id}/${userId}/page`);
  };
  return (
    <AnimatePresence>
      <Cont
        size={size!}
        variants={vars}
        onClick={onClick}
        custom={{ theme, isRound }}
        exit="exit"
        initial="initial"
        animate="animate"
        whileHover="hover"
        className="avatar"
      >
        {avatar && <motion.img src={avatarLink(avatar)} />}
        {!avatar && (
          <NoImg>
            <Svg type="user" theme={theme} item={{ size: '100%' }} />
          </NoImg>
        )}
      </Cont>
    </AnimatePresence>
  );
};
const Cont = styled(Flex)<{ size: string }>`
  cursor: pointer;
  overflow: hidden;
  position: relative;
  width: ${(p) => p.size && p.size};
  height: ${(p) => p.size && p.size};
  img {
    width: 100%;
    height: 100%;
  }
`;
const NoImg = styled(Flex)`
  width: 50%;
  height: 50%;
  border-radius: 100%;
  svg {
    pointer-events: none;
  }
`;
const vars = {
  exit: () => ({ opacity: 0, scale: 0 }),
  initial: () => ({ opacity: 0, scale: 0 }),
  animate: ({ theme, isRound }: any) => ({
    scale: 1,
    opacity: 1,
    outline: border(theme),
    borderRadius: isRound ? '100%' : '10%',
    transition: { duration: isRound ? 0.2 : 0.4 },
  }),
  hover: ({ isRound }: any) => ({
    borderRadius: '100%',
    outline: '3px solid #E50914',
    transition: { duration: isRound ? 0.2 : 0.4 },
  }),
};
export const avatarLink = (url: string | any) => {
  const no_img = '/img/1.jpg';
  const variant = 'public';
  const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
  if (!Boolean(url)) return no_img;
  else return `${base}/${url}/${variant}`;
};
export interface IAvatarInput {
  _modal?: {
    isModal?: boolean;
    closeModal?: () => void;
  };
  _data: {
    size?: string;
    theme: boolean;
    host_id: number;
    isRound?: boolean;
    isOther?: boolean;
    handleClick?: () => void;
  };
}
