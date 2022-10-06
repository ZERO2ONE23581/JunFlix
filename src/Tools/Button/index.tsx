import { Svg } from '../Svg';
import styled from '@emotion/styled';
import { MouseEventHandler } from 'react';
import { ITheme } from '../../../styles/theme';
import { AnimatePresence, motion } from 'framer-motion';
import { themeColorTrans } from '../../../styles/variants';

interface IBtn extends ITheme {
  svg?: string;
  name?: string;
  disabled?: boolean;
  type: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

export const Btn = ({ theme, svg, type, name, onClick, disabled }: IBtn) => {
  const btnVar = {
    initial: themeColorTrans,
    animate: themeColorTrans,
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
        {svg && <Svg onBtn theme={!theme} type={svg} size="1.5em" />}
      </Cont>
    </AnimatePresence>
  );
};
export const Cont = styled(motion.button)`
  border: none;
  padding: 0.6rem;
  font-size: 1em;
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
