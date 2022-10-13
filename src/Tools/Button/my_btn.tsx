import { Svg } from '../Svg';
import styled from '@emotion/styled';
import { border, color, TransBorder } from '../../../styles/variants';
import { MouseEventHandler, ReactElement, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCapLetter } from '../../libs/client/useTools';

interface IBtn {
  item: {
    name: string;
    category: string;
    theme: boolean;
    layoutId?: number;
    className?: string;
    disabled?: boolean;
  };
  type: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}
export const MyBtn = ({ item, type, onClick }: IBtn) => {
  const name = item?.name!;
  const theme = item?.theme!;
  const category = item?.category!;
  const disabled = item?.disabled!;
  const className = item?.className!;
  //
  const isClicked = Boolean(name === useCapLetter(category));
  const custom = { theme, isClicked };
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
        {name && <span>{name}</span>}
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
  gap: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: inherit;
`;
const btnVar = {
  initial: ({ theme, isClicked }: any) => ({
    color: isClicked ? '#ffffff' : color(theme),
    borderBottom: isClicked
      ? '3px solid rgba(229,9,20)'
      : '3px solid transparent',
  }),
  animate: ({ theme, isClicked, isFollowing }: any) => ({
    transition: { duration: 0.3 },
    color: isClicked ? '#ffffff' : color(theme),
    borderBottom: isClicked
      ? '3px solid rgba(229,9,20)'
      : '3px solid transparent',
  }),
  hover: {
    color: '#E50914',
    transition: { duration: 0.3 },
  },
};
