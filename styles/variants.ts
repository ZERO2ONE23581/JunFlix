//border: theme ? '1px solid transparent' : '1px solid #636e72',
//theme은 dark가 default, 즉 boolean값은 기본적으로 false가 들어오게 됨.
export const redColor = '#E50914';
export const blackColor = '#000000';
export const whiteColor = '#ffffff';
export const redBrdr = `1px solid ${redColor}`;
export const transBrdr = `1px solid transparent`;
export const whiteBrdr = `1px solid ${whiteColor}`;
export const blackBrdr = `1px solid ${blackColor}`;
export const TweenTrans = { type: 'tween', stiffness: 50 };
export const SpringTrans = { type: 'spring', stiffness: 100 };
export const color = (dark: boolean) => (dark ? blackColor : whiteColor);
export const border = (dark: boolean) => (dark ? blackBrdr : whiteBrdr);
export const TransBorder = (dark: boolean) => (dark ? whiteBrdr : transBrdr);

export const greyColor = '#bdc3c7';
export const greyBrdr = `1px solid ${greyColor}`;
export const GreyBorder = (dark: boolean) => (dark ? whiteBrdr : greyBrdr);

export const colorVar = {
  exit: (theme: boolean) => ({ color: color(theme) }),
  initial: (theme: boolean) => ({ color: color(theme) }),
  animate: (theme: boolean) => ({ color: color(theme) }),
};
export const animateColorVar = {
  animate: (theme: boolean) => ({
    color: color(!theme),
    backgroundColor: color(theme),
  }),
};
export const hoverVars = {
  animate: (theme: boolean) => ({ color: color(theme) }),
  hover: () => ({ scale: 1.1, color: redColor, transition: { duration: 0.4 } }),
};
export const hoverBgVars = {
  animate: (theme: boolean) => ({
    color: color(theme),
    backgroundColor: color(!theme),
  }),
  hover: () => ({
    scale: 1.1,
    color: redColor,
    fill: whiteColor,
    backgroundColor: redColor,
    transition: { duration: 0.4 },
  }),
};
export const opacityVar = {
  exit: { opacity: 0, transition: { duration: 0.3 } },
  initial: { opacity: 0, transition: { duration: 0.3 } },
  animate: { opacity: 1, transition: { duration: 0.3 } },
};
export const hoverBgColor = {
  animate: (theme: boolean) => ({ color: color(theme) }),
  hover: { transition: { duration: 0.3 }, backgroundColor: redColor },
};
export const hoverScale = {
  hover: { scale: 1.1, transition: { duration: 0.3 }, color: redColor },
};
export const hoverColor = {
  hover: { scale: 1.1, transition: { duration: 0.3 }, color: redColor },
};
export const modalVar = {
  exit: () => ({
    scale: 0,
    opacity: 0,
    transition: { duration: 0.4 },
  }),
  initial: () => ({
    scale: 0,
    opacity: 0,
    transition: { duration: 0.4 },
  }),
  animate: ({ theme, isRed }: any) => ({
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4 },
    backgroundColor: color(!theme),
    color: isRed ? redColor : color(theme),
    border: isRed ? `3px solid ${redColor}` : TransBorder(!theme),
  }),
};
export const noneBorderVar = {
  animate: (theme: boolean) => ({
    opacity: 1,
    color: color(theme),
    transition: { duration: 0.5 },
    backgroundColor: color(!theme),
  }),
  initial: () => ({ opacity: 0 }),
  exit: () => ({ opacity: 0, transition: { duration: 0.5 } }),
};
export const variants = {
  exit: () => ({ opacity: 0 }),
  initial: () => ({ opacity: 0 }),
  animate: (theme: boolean) => ({
    opacity: 1,
    color: color(theme),
    border: TransBorder(!theme),
    transition: { duration: 0.5 },
    backgroundColor: color(!theme),
  }),
};
export const cmtModalVar = {
  exit: () => ({ y: 999, opacity: 0 }),
  initial: () => ({ y: 999, opacity: 0 }),
  animate: (theme: boolean) => ({
    y: 0,
    opacity: 1,
    color: color(theme),
    backgroundColor: color(!theme),
    transition: { duration: 0.5 },
  }),
};
export const leftToRight = {
  initial: () => ({
    x: -9999,
    scale: 0.5,
    opacity: 0,
    transition: { duration: 0.8 },
  }),
  animate: ({ theme, isMobile }: any) => ({
    x: 0,
    scale: 1,
    opacity: 1,
    color: color(theme),
    backgroundColor: color(!theme),
    transition: { duration: 0.8 },
    border: isMobile ? '1px solid transparent' : TransBorder(!theme),
  }),
  exit: () => ({
    x: 9999,
    scale: 0.5,
    opacity: 0,
    transition: { duration: 0.8 },
  }),
};
export const fromTopVar = {
  initial: (theme: boolean) => ({
    y: -999,
    opacity: 0,
    color: color(theme),
    backgroundColor: color(!theme),
  }),
  animate: (theme: boolean) => ({
    y: 0,
    opacity: 1,
    color: color(theme),
    backgroundColor: color(!theme),
    transition: { duration: 0.5 },
  }),
  exit: (theme: boolean) => ({
    y: -999,
    opacity: 0,
    color: color(theme),
    backgroundColor: color(!theme),
    transition: { duration: 0.5 },
  }),
};
export const mobVars = {
  initial: () => ({ opacity: 0 }),
  exit: () => ({ opacity: 0, transition: { duration: 0.5 } }),
  animate: ({ theme, isDesk, isRed }: any) => ({
    opacity: 1,
    transition: { duration: 0.5 },
    backgroundColor: color(!theme),
    color: isRed ? redColor : color(theme),
    border: !isDesk ? '1px solid transparent' : TransBorder(!theme),
  }),
};
