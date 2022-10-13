import styled from '@emotion/styled';
import { motion } from 'framer-motion';

//theme은 dark가 default, 즉 boolean값은 기본적으로 false가 들어오게 됨.
const black = 'rgba(0,0,0)';
const logo = 'rgba(229,9,20)';
const white = 'rgba(255,255,255)';
const redBrdr = `2px solid ${logo}`;
const blackBrdr = `1px solid ${black}`;
const whiteBrdr = `1px solid ${white}`;
const transBrdr = `1px solid transparent`;
export const TweenTrans = { type: 'tween', stiffness: 50 };
export const SpringTrans = { type: 'spring', stiffness: 50 };
export const color = (dark: boolean) => (dark ? black : white);
export const border = (dark: boolean) => (dark ? blackBrdr : whiteBrdr);
export const TransBorder = (dark: boolean) => (dark ? whiteBrdr : transBrdr);
export const due = (sec: number) => ({ transition: { duration: 0.3 } });

export const colorVar = {
  exit: (theme: boolean) => ({ color: color(theme) }),
  initial: (theme: boolean) => ({ color: color(theme) }),
  animate: (theme: boolean) => ({ color: color(theme) }),
};

export const variants = {
  initial: (theme: boolean) => ({
    opacity: 0,
    color: color(theme),
    border: TransBorder(theme),
    backgroundColor: color(!theme),
  }),
  animate: (theme: boolean) => ({
    opacity: 1,
    color: color(theme),
    border: TransBorder(theme),
    backgroundColor: color(!theme),
    transition: { duration: 0.3 },
  }),
  exit: (theme: boolean) => ({
    opacity: 0,
    color: color(!theme),
    border: TransBorder(theme),
    backgroundColor: color(theme),
    transition: { duration: 0.3 },
  }),
};
export const opacityVar = {
  exit: { opacity: 0 },
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};
export const hoverBgColor = {
  hover: { transition: due(0.3), backgroundColor: logo },
};
export const hoverScale = {
  hover: { scale: 1.1, transition: due(0.3), color: logo },
};
export const boxVars = { hover: { y: -20, scale: 1.1, transition: due(0.3) } };
export const slideVars = {
  initial: (reverse: boolean) => ({ x: reverse ? -2000 : 2000 }),
  animate: (reverse: boolean) => ({ x: 0, transition: TweenTrans }),
  exit: (reverse: boolean) => ({
    x: reverse ? 2000 : -2000,
    transition: TweenTrans,
  }),
};
export const menuModalVar = {
  initial: { y: '0', x: '-50%', opacity: 0 },
  exit: { y: '0', opacity: 0, transition: { duration: 0.3 } },
  hover: { backgroundColor: logo, transition: { duration: 0.2 } },
  animate: { x: '-50%', y: '30px', opacity: 1, transition: { duration: 0.3 } },
};
export const labelVar = {
  initial: ({ theme }: any) => ({
    opacity: 1,
    fontSize: '1.3rem',
    translateY: '-50%',
    transition: due(0.3),
    color: color(!theme),
    backgroundColor: color(theme),
  }),
  animate: ({ isFocus, theme, disabled }: any) => ({
    opacity: 1,
    transition: due(0.3),
    color: color(!theme),
    backgroundColor: color(theme),
    width: isFocus ? 'fit-content' : '80%',
    translateY: isFocus ? '-150%' : '-50%',
    fontSize: isFocus ? '1.1rem' : '1.3rem',
  }),
  exit: (theme: boolean) => ({
    opacity: 0,
    color: color(theme),
    backgroundColor: color(!theme),
  }),
};
export const inputVar = {
  initial: ({ theme, isFocus }: any) => ({
    backgroundColor: color(theme),
    color: isFocus ? logo : color(!theme),
    outline: isFocus ? redBrdr : border(!theme),
  }),
  animate: ({ theme, isFocus }: any) => ({
    backgroundColor: color(theme),
    color: isFocus ? logo : color(!theme),
    outline: isFocus ? redBrdr : border(!theme),
  }),
  hover: () => ({ transition: due(0.3), outline: redBrdr }),
  focus: () => ({ outline: redBrdr, transition: due(0.3) }),
};
export const inputErrVar = {
  exit: { opacity: 0, color: logo },
  initial: { opacity: 0, color: logo },
  animate: { opacity: 0, color: logo },
};
