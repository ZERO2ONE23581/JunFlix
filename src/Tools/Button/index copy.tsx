import { Svg } from '../Svg';
import styled from '@emotion/styled';
import { color } from '../../../styles/variants';
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
    type?: 'button' | 'submit' | 'reset';
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  };
  children?: ReactElement;
}
export const Btn = ({ item, children }: IBtn) => {
  const svg = item.svg;
  const name = item.name;
  const type = item.type;
  const theme = item.theme;
  const onClick = item.onClick;
  const disabled = item.disabled;
  const className = item.className;
  const isClicked = item.isClicked;
  const layoutId = item.layoutId + '';
  const isFollowing = item.isFollowing;
  const custom = { theme, isClicked, isFollowing };
  //
  return (
    <AnimatePresence initial={false}>
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
          {children && (
            <Contents layoutId={layoutId} className="child">
              {children}
            </Contents>
          )}
          {svg && <Svg onBtn type={svg} size="2rem" theme={theme} />}
        </>
      </Cont>
    </AnimatePresence>
  );
};
const Contents = styled(motion.span)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;
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
    backgroundColor: isFollowing ? '#000000' : color(!theme),
    border: isFollowing ? '1px solid #ffffff' : '1px solid transparent',
    color: isFollowing ? '#ffffff' : isClicked ? '#E50914' : color(theme),
  }),
  animate: ({ theme, isClicked, isFollowing }: any) => ({
    transition: {
      duration: 0.3,
    },
    backgroundColor: isFollowing ? '#000000' : color(!theme),
    border: isFollowing ? '1px solid #ffffff' : '1px solid transparent',
    color: isFollowing ? '#ffffff' : isClicked ? '#E50914' : color(theme),
  }),
  hover: {
    fill: '#ffff',
    color: '#ffff',
    backgroundColor: '#E50914',
    transition: {
      duration: 0.3,
    },
  },
};
