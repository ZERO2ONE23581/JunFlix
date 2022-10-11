import { Svg } from '../Svg';
import styled from '@emotion/styled';
import { MouseEventHandler, ReactElement } from 'react';
import { ITheme } from '../../../styles/theme';
import { AnimatePresence, motion } from 'framer-motion';
import { themeColorTrans } from '../../../styles/variants';

interface IBtn extends ITheme {
  children?: ReactElement;
  svg?: string;
  name?: string;
  layoutId?: number;
  className?: string;
  isClicked?: boolean;
  disabled?: boolean;
  type: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

export const Btn = ({
  children,
  theme,
  className,
  svg,
  type,
  name,
  onClick,
  isClicked,
  disabled,
  layoutId,
}: IBtn) => {
  const btnVar = {
    initial: ({ theme, isClicked }: any) => ({
      color: isClicked ? '#E50914' : theme ? '#000000' : '#ffffff',
      backgroundColor: theme ? '#ffffff' : '#000000',
      borderBottom: isClicked ? '3px solid #E50914' : '1px solid transparent',
    }),
    animate: ({ theme, isClicked }: any) => ({
      borderBottom: isClicked ? '3px solid #E50914' : '1px solid transparent',
      color: isClicked ? '#E50914' : theme ? '#000000' : '#ffffff',
      backgroundColor: theme ? '#ffffff' : '#000000',
    }),
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
    <AnimatePresence initial={false}>
      <Cont
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={className}
        exit="exit"
        custom={{ theme: !theme, isClicked }}
        variants={btnVar}
        animate="animate"
        initial="initial"
        whileHover="hover"
      >
        <>
          <span>{name}</span>
          {children && (
            <motion.span layoutId={layoutId + ''} className="child">
              {children}
            </motion.span>
          )}
          {svg && <Svg onBtn theme={!theme} type={svg} size="1.5em" />}
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
