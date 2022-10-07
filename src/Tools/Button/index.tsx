import { Svg } from '../Svg';
import styled from '@emotion/styled';
import { MouseEventHandler } from 'react';
import { ITheme } from '../../../styles/theme';
import { AnimatePresence, motion } from 'framer-motion';
import { themeColorTrans } from '../../../styles/variants';

interface IBtn extends ITheme {
  svg?: string;
  name?: string;
  className?: string;
  disabled?: boolean;
  type: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

export const Btn = ({
  theme,
  className,
  svg,
  type,
  name,
  onClick,
  disabled,
}: IBtn) => {
  const btnVar = {
    initial: themeColorTrans,
    animate: themeColorTrans,
    hover: {
      //scale: 1.05,
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
        onClick={onClick}
        disabled={disabled}
        className={className}
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
  svg {
    //pointer-events: none;
  }
`;
