import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { ITheme } from '../../../../styles/theme';
import { Svg } from '../../../components/Tools/Svg';

interface IUserAvatar extends ITheme {
  avatar?: string | null;
  setModal: Dispatch<SetStateAction<boolean>>;
}
export const UserAvatarIcon = ({ avatar, setModal, theme }: IUserAvatar) => {
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
      {avatar && (
        <Cont
          url={url}
          exit="exit"
          variants={proVar}
          initial="initial"
          animate="animate"
          whileHover={'hover'}
          className="loggedIn-profile"
          onClick={() => setModal((p) => !p)}
          transition={{ type: 'spring', stiffness: 100 }}
        />
      )}
      {!avatar && (
        <Svg
          size="3em"
          theme={theme}
          type="profile"
          onClick={() => setModal((p) => !p)}
        />
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
