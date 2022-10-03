import { Svg } from '../../../Tools/Svg';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';

interface IUserAvatar {
  avatar?: string | null;
  setModal: Dispatch<SetStateAction<boolean>>;
}
export const UserAvatar = ({ avatar, setModal }: IUserAvatar) => {
  const variant = 'public';
  const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
  const url = `${base}/${avatar}/${variant}`;
  const proVar = {
    hover: {
      scale: 1.3,
      borderRadius: '100%',
      border: '3px solid #E50914',
      transition: {
        duration: 0.3,
      },
    },
  };
  return (
    <>
      <Cont
        url={url}
        className="menu-profile"
        onClick={() => setModal((p) => !p)}
        exit="exit"
        variants={proVar}
        initial="initial"
        animate="animate"
        whileHover={'hover'}
        transition={{ type: 'spring', stiffness: 100 }}
      />
      {!avatar && <Svg size="3em" type="profile" />}
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
