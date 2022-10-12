import { Svg } from '../Svg';
import styled from '@emotion/styled';
import { color } from '../../../styles/variants';
import { MouseEventHandler, ReactElement } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface IBtn {
  children?: ReactElement;
  isNumber?: {
    layoutId?: number;
  };
  isString?: {
    svg?: string;
    btnName?: string;
    className?: string;
  };
  isBoolean?: {
    theme: boolean;
    disabled?: boolean;
    isClicked?: boolean;
    isFollowing?: boolean;
  };
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}
export const Btn = ({
  type,
  onClick,
  children,
  isNumber,
  isString,
  isBoolean,
}: IBtn) => {
  const theme = !isBoolean?.theme;
  const isClicked = isBoolean?.isClicked;
  const isFollowing = isBoolean?.isFollowing;
  const custom = { theme, isClicked, isFollowing };
  return (
    <AnimatePresence initial={false}>
      <Cont
        exit="exit"
        animate="animate"
        initial="initial"
        whileHover="hover"
        variants={btnVar}
        custom={{ ...custom }}
        type={type}
        onClick={onClick}
        disabled={isBoolean?.disabled}
        className={isString?.className}
      >
        <>
          {isString?.btnName && <span>{isString.btnName}</span>}
          {children && (
            <motion.span layoutId={isNumber?.layoutId + ''} className="child">
              {children}
            </motion.span>
          )}
          {isString?.svg && (
            <Svg
              onBtn
              size="1.5em"
              type={isString.svg}
              theme={!isBoolean?.theme}
            />
          )}
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
  border-radius: 3px;
  gap: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  font-size: 1.2rem;
  font-weight: 500;
  span {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .child {
    position: absolute;
  }
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
