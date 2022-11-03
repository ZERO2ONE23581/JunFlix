import { Svg } from '../Svg';
import styled from '@emotion/styled';
import { MouseEventHandler } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  color,
  greyColor,
  redColor,
  whiteColor,
} from '../../../styles/variants';

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
  const custom = { theme, isClicked, isFollowing, disabled };
  //
  return (
    <AnimatePresence>
      <Cont
        exit="exit"
        animate="animate"
        initial="initial"
        whileHover="hover"
        type={type}
        variants={vars}
        onClick={onClick}
        disabled={disabled}
        className={className}
        custom={{ ...custom }}
      >
        <>
          {name && <span>{name}</span>}
          {svg && <Svg type={svg} theme={!theme} />}
        </>
      </Cont>
    </AnimatePresence>
  );
};
export const Cont = styled(motion.button)`
  width: 100%;
  border: none;
  padding: 8px;
  outline: none;
  font-weight: 500;
  font-size: 1.2rem;
  border-radius: 3px;
  position: relative;
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const vars = {
  animate: ({ theme, disabled, isClicked }: any) => ({
    transition: { duration: 0.3 },
    color: isClicked ? whiteColor : color(!theme),
    backgroundColor: disabled ? greyColor : isClicked ? redColor : color(theme),
  }),
  hover: ({ theme, disabled }: any) => ({
    transition: { duration: 0.3 },
    color: disabled ? color(!theme) : whiteColor,
    backgroundColor: disabled ? greyColor : redColor,
  }),
};
