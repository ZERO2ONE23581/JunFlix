import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const themeColorTrans = (theme: boolean) => ({
  color: theme ? '#000000' : '#ffffff',
  backgroundColor: theme ? '#ffffff' : '#000000',
});
export const modalVar = {
  initial: (theme: boolean) => ({
    opacity: 0,
    color: theme ? '#000000' : '#ffffff',
    backgroundColor: theme ? '#ffffff' : '#000000',
  }),
  animate: (theme: boolean) => ({
    opacity: 1,
    backgroundColor: theme ? '#ffffff' : '#000000',
    transition: { duration: 0.3 },
  }),
  exit: (theme: boolean) => ({
    opacity: 0,
    transition: { duration: 0.3 },
  }),
};
export const hoverTextVar = {
  hover: {
    scale: 1.05,
    color: '#E50914',
    transition: { duration: 0.3 },
  },
};
export const motionDuration = { duration: 0.5 };
export const SpringTrans = { type: 'spring', stiffness: 50 };
export const TweenTrans = { type: 'tween', stiffness: 50 };
export const boxVars = {
  initial: {
    scale: 1,
  },
  hover: {
    y: -20,
    scale: 1.2,
    transition: {
      delay: 0.2,
      duration: 0.4,
    },
  },
};
export const postVars = {
  initial: {
    scale: 1,
  },
  hover: {
    y: -20,
    scale: 1.3,
    transition: {
      delay: 0.2,
      duration: 0.4,
    },
  },
};
export const slideVars = {
  initial: (reverse: boolean) => ({
    x: reverse ? -2000 : 2000,
  }),
  animate: (reverse: boolean) => ({
    x: 0,
    transition: {
      type: 'linear',
      duration: 1,
    },
  }),
  exit: (reverse: boolean) => ({
    transition: {
      type: 'linear',
      duration: 1,
    },
    x: reverse ? 2000 : -2000,
  }),
};

export const menuModalVar = {
  hover: (isAnimate: boolean) => ({
    backgroundColor: '#E50914',
    transition: {
      duration: 0.2,
    },
  }),
  initial: (isAnimate: boolean) => ({
    opacity: 0,
    x: '-50%',
    y: '0',
  }),
  animate: (isAnimate: boolean) => ({
    x: '-50%',
    y: '30px',
    opacity: 1,
    transition: { delay: 0, duration: 0.3 },
  }),
  exit: (isAnimate: boolean) => ({
    y: '0',
    opacity: 0,
    transition: { delay: 0, duration: 0.3 },
  }),
};
export const ListHover = {
  backgroundColor: '#E50914',
  transition: {
    duration: 0.2,
  },
};
export const isMemberVar = {
  initial: themeColorTrans,
  animate: themeColorTrans,
  hover: {
    scale: 1.1,
    color: '#E50914',
  },
};
//
export const joinBoxVar = {
  initial: (theme: boolean) => ({
    opacity: 0,
    color: theme ? '#000000' : '#ffffff',
    backgroundColor: theme ? '#ffffff' : '#000000',
  }),
  animate: (theme: boolean) => ({
    opacity: 1,
    color: theme ? '#000000' : '#ffffff',
    backgroundColor: theme ? '#ffffff' : '#000000',
    transition: {
      duration: 0.6,
    },
  }),
  exit: (theme: boolean) => ({
    opacity: 0,
  }),
};
export const BoxBgVar = {
  initial: (theme: boolean) => ({
    color: theme ? '#000000' : '#ffffff',
    backgroundColor: theme ? '#ffffff' : '#000000',
  }),
  animate: (theme: boolean) => ({
    color: theme ? '#000000' : '#ffffff',
    backgroundColor: theme ? '#ffffff' : '#000000',
    transition: {
      duration: 0.6,
    },
  }),
  exit: (theme: boolean) => ({}),
};
export const labelVar = {
  initial: ({ theme, id }: any) => ({
    opacity: 1,
    translateY: '-50%',
    fontSize: '1.3rem',
    transition: { duration: 0.2 },
    color: !theme ? '#000000' : '#b2bec3',
    backgroundColor: theme ? '#000000' : '#ffffff',
  }),
  animate: ({ isFocus, theme, disabled, id }: any) => ({
    opacity: 1,
    transition: { duration: 0.1 },
    padding: id === 'birth' ? '3px 20px' : '3px 10px',
    width: isFocus ? 'fit-content' : '90%',
    translateY: isFocus ? '-150%' : '-50%',
    fontSize: isFocus ? '1.1rem' : '1.3rem',
    backgroundColor: theme ? '#000000' : '#ffffff',
    color: disabled
      ? '#636e72'
      : isFocus
      ? '#E50914'
      : !theme
      ? '#000000'
      : '#b2bec3',
  }),
  exit: (isFocus: boolean) => ({
    opacity: 0,
  }),
};
//border는 none, outline은 1px theme -> hover, focus시 3px logo색상
export const inputVar = {
  initial: ({ theme, isFocus, disabled, height }: any) => ({
    color: disabled ? '#E50914' : theme ? '#ffffff' : '#000000',
    backgroundColor: !theme ? '#ffffff' : '#000000',
    outline: isFocus
      ? '3px solid #E50914 '
      : disabled
      ? '3px solid #636e72'
      : theme
      ? '1px solid #ffffff'
      : '1px solid #000000',
  }),
  animate: ({ theme, isFocus, disabled, height }: any) => ({
    color: disabled ? '#636e72' : theme ? '#ffffff' : '#000000',
    backgroundColor: !theme ? '#ffffff' : '#000000',
    outline: isFocus
      ? '3px solid #E50914 '
      : disabled
      ? '3px solid #636e72'
      : theme
      ? '1px solid #ffffff'
      : '1px solid #000000',
  }),
  hover: ({ disabled }: any) => ({
    transition: { duration: 0.2 },
    outline: !disabled ? '3px solid rgb(229,9,20)' : '3px solid #636e72',
  }),
  focus: ({ disabled }: any) => ({
    transition: { duration: 0.2 },
    outline: !disabled ? '3px solid rgb(229,9,20)' : '3px solid #636e72',
  }),
};
export const textAreaVar = {
  initial: ({ theme, isFocus, disabled, height }: any) => ({
    height: height ? height : '100%',
    color: disabled ? '#E50914' : theme ? '#ffffff' : '#000000',
    backgroundColor: !theme ? '#ffffff' : '#000000',
    outline: isFocus
      ? '3px solid #E50914 '
      : disabled
      ? '3px solid #636e72'
      : theme
      ? '1px solid #ffffff'
      : '1px solid #000000',
  }),
  animate: ({ theme, isFocus, disabled, height }: any) => ({
    height: height ? height : '100%',
    color: disabled ? '#636e72' : theme ? '#ffffff' : '#000000',
    backgroundColor: !theme ? '#ffffff' : '#000000',
    outline: isFocus
      ? '3px solid #E50914 '
      : disabled
      ? '3px solid #636e72'
      : theme
      ? '1px solid #ffffff'
      : '1px solid #000000',
  }),
  hover: ({ disabled }: any) => ({
    transition: { duration: 0.2 },
    outline: !disabled ? '3px solid rgb(229,9,20)' : '3px solid #636e72',
  }),
  focus: ({ disabled }: any) => ({
    transition: { duration: 0.2 },
    outline: !disabled ? '3px solid rgb(229,9,20)' : '3px solid #636e72',
  }),
};
export const inputErrVar = {
  initial: ({ theme }: any) => ({
    opacity: 0,
    color: '#E50914',
  }),
  animate: ({ theme }: any) => ({
    opacity: 1,
    color: '#E50914',
  }),
  exit: ({ theme }: any) => ({
    opacity: 0,
    color: '#E50914',
  }),
};
export const answerVar = {
  initial: (theme: boolean) => ({
    opacity: 0,
    color: theme ? '#000000' : '#ffffff',
    backgroundColor: theme ? '#ffffff' : '#000000',
  }),
  animate: (theme: boolean) => ({
    opacity: 1,
    transition: { duration: 0.6 },
    color: theme ? '#000000' : '#ffffff',
    backgroundColor: theme ? '#ffffff' : '#000000',
  }),
  exit: (theme: boolean) => ({
    opacity: 0,
    transition: { duration: 0.6 },
  }),
};
export const Circle = styled(motion.div)`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 100%;
  background-color: ${(p) => p.theme.color.logo};
`;
export const circleVar = {
  initial: (theme: boolean) => ({
    opacity: 0,
  }),
  animate: (theme: boolean) => ({
    opacity: 1,
    transition: { duration: 0.4 },
  }),
  exit: (theme: boolean) => ({
    opacity: 0,
    transition: { duration: 0.4 },
  }),
};
