import { Svg } from '../Svg';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { border } from '../../../styles/variants';
import { Flex } from '../../../styles/global';
import { avatarLink } from './indexxx';
import { ITheme } from '../../../styles/theme';
import { useGetUser } from '../../libs/client/useUser';

export interface IAvatarInput {
  _data: {
    size: string;
    theme: boolean;
    host_id: number;
    isRound?: boolean;
  };
}
export const Avatar = ({ _data }: IAvatarInput) => {
  const { isRound, size, theme, host_id } = _data;
  const { avatar } = useGetUser(host_id);
  return (
    <AnimatePresence>
      <Cont
        exit="exit"
        initial="initial"
        animate="animate"
        whileHover="hover"
        size={size}
        variants={vars}
        className="avatar"
        custom={{ theme, isRound }}
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
  exit: () => ({ opacity: 0 }),
  initial: () => ({ opacity: 0 }),
  animate: ({ theme, isRound }: any) => ({
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
