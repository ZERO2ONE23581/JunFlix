import { Svg } from '../Svg';
import styled from '@emotion/styled';
import { MouseEventHandler } from 'react';
import { ITheme } from '../../../styles/theme';
import { AnimatePresence, motion } from 'framer-motion';

interface IBtn extends ITheme {
  svg?: string;
  name?: string;
  disabled?: boolean;
  type: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

export const Btn = ({ theme, svg, type, name, onClick, disabled }: IBtn) => {
  const btnVar = {
    initial: (dark: boolean) => ({
      color: dark ? '#000000' : '#ffffff',
      backgroundColor: dark ? '#ffffff' : '#000000',
    }),
    animate: (dark: boolean) => ({
      color: dark ? '#000000' : '#ffffff',
      backgroundColor: dark ? '#ffffff' : '#000000',
    }),
    hover: {
      scale: 1.1,
      fill: '#ffff',
      color: '#ffff',
      backgroundColor: '#E50914',
      transition: {
        duration: 0.2,
      },
    },
  };
  return (
    <AnimatePresence>
      <Cont
        type={type}
        className="btn"
        onClick={onClick}
        disabled={disabled}
        //
        exit="exit"
        custom={!theme}
        variants={btnVar}
        animate="animate"
        initial="initial"
        whileHover="hover"
      >
        <span>{name}</span>
        <span>
          {svg && <Svg onBtn theme={!theme} type={svg} size="1.5em" />}
        </span>
      </Cont>
    </AnimatePresence>
  );
};
export const Cont = styled(motion.button)`
  border: none;
  padding: 0.6rem;
  font-size: 1.1em;
  border-radius: 3px;
  gap: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    :first-of-type {
      font-weight: 500;
    }
  }
  svg {
    //pointer-events: none;
  }
`;
