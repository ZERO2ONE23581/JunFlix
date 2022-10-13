import { Svg } from '../Svg';
import styled from '@emotion/styled';
import { border, color } from '../../../styles/variants';
import { MouseEventHandler, ReactElement, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface IBtn {
  item: {
    svg?: string;
    theme: boolean;
    name?: string;
    layoutId?: number;
    className?: string;
    disabled?: boolean;
    isClicked?: boolean;
    isFollowing?: boolean;
  };
  type: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}
export const Btn = ({ item, type, onClick }: IBtn) => {
  const svg = item?.svg!;
  const name = item?.name!;
  const theme = item?.theme!;
  const disabled = item?.disabled!;
  const className = item?.className!;
  const isClicked = item?.isClicked!;
  const isFollowing = item?.isFollowing!;
  const custom = { theme, isClicked, isFollowing };
  //
  return (
    <AnimatePresence>
      <Cont
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={className}
        exit="exit"
        animate="animate"
        initial="initial"
        whileHover="hover"
        variants={btnVar}
        custom={{ ...custom }}
      >
        <>
          {name && <span>{name}</span>}
          {svg && <Svg onBtn type={svg} size="2rem" theme={theme} />}
        </>
      </Cont>
    </AnimatePresence>
  );
};
export const Cont = styled(motion.button)`
  position: relative;
  width: 100%;
  border: none;
  padding: 8px;
  outline: none;
  font-weight: 500;
  font-size: 1.2rem;
  border-radius: 3px;
  gap: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const btnVar = {
  initial: ({ theme, isClicked, isFollowing }: any) => ({
    border: border(isFollowing),
    backgroundColor: isFollowing ? '#000000' : color(!theme),
    color: isFollowing ? '#ffffff' : isClicked ? '#E50914' : color(theme),
  }),
  animate: ({ theme, isClicked, isFollowing }: any) => ({
    transition: { duration: 0.3 },
    backgroundColor: isFollowing ? '#000000' : color(!theme),
    border: border(isFollowing),
    color: isFollowing ? '#ffffff' : isClicked ? '#E50914' : color(theme),
  }),
  hover: {
    fill: '#ffff',
    color: '#ffff',
    backgroundColor: '#E50914',
    transition: { duration: 0.3 },
  },
};
