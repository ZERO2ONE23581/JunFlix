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

const scale = { scale: 0.2, opacity: 0, transition: { duration: 0.8 } };
const __scale = { scale: 1, opacity: 1, transition: { duration: 0.8 } };
export const onlyScaleVar = {
  initial: { ...scale },
  animate: { ...__scale },
  exit: { ...scale },
};

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
  animate: (theme: boolean) => ({
    color: color(theme),
    //backgroundColor: color(!theme),
  }),
  hover: () => ({
    scale: 1.1,
    color: redColor,
    transition: { duration: 0.4, delay: 0.4 },
  }),
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
  initial: { opacity: 0, transition: { duration: 0.3 } },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
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
export const scaleVar = {
  initial: ({ theme, duration }: any) => ({
    scale: 0.2,
    opacity: 0,
    color: color(theme),
    transition: { duration },
    backgroundColor: color(!theme),
  }),
  animate: ({ theme, duration }: any) => ({
    scale: 1,
    opacity: 1,
    color: color(theme),
    backgroundColor: color(!theme),
    transition: { duration },
  }),
  exit: ({ theme, duration }: any) => ({
    scale: 0.2,
    opacity: 0,
    transition: { duration },
  }),
};
export const variants = {
  initial: (theme: boolean) => ({
    opacity: 0,
    color: color(theme),
    backgroundColor: color(!theme),
  }),
  animate: (theme: boolean) => ({
    opacity: 1,
    color: color(theme),
    backgroundColor: color(!theme),
    transition: { duration: 0.5 },
  }),
  exit: (theme: boolean) => ({
    opacity: 0,
    color: color(theme),
    backgroundColor: color(!theme),
    transition: { duration: 0.5 },
  }),
};
export const TransBorderVar = {
  initial: (theme: boolean) => ({
    opacity: 0,
    scale: 0.1,
    transition: { duration: 0.5 },
  }),
  animate: (theme: boolean) => ({
    scale: 1,
    opacity: 1,
    border: TransBorder(!theme),
    transition: { duration: 0.5 },
    backgroundColor: color(!theme),
  }),
  exit: (theme: boolean) => ({
    scale: 0.1,
    opacity: 0,
    transition: { duration: 0.5 },
  }),
};
export const btnVar = {
  initial: ({ theme, isClicked, isFollowing }: any) => ({
    opacity: 0,
    color: isFollowing ? whiteColor : color(!theme),
    backgroundColor: isFollowing ? redColor : color(theme),
  }),
  animate: ({ theme, isClicked, isFollowing }: any) => ({
    opacity: 1,
    transition: { duration: 0.3 },
    color: isFollowing ? whiteColor : color(!theme),
    backgroundColor: isFollowing ? redColor : color(theme),
  }),
  exit: {
    opacity: 0,
  },
  hover: {
    fill: '#ffffff',
    color: '#ffffff',
    backgroundColor: '#E50914',
    transition: { duration: 0.3 },
  },
};
export const boxVars = {
  hover: { y: -20, scale: 1.1, transition: { duration: 0.3 } },
};
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
  hover: { backgroundColor: redColor, transition: { duration: 0.2 } },
  animate: { x: '-50%', y: '30px', opacity: 1, transition: { duration: 0.3 } },
};
export const inputVar = {
  animate: ({ theme, isFocus, disabled }: any) => ({
    transition: { duration: 0.4 },
    backgroundColor: color(theme),
    color: disabled ? redColor : color(!theme),
    outline: isFocus ? redBrdr : TransBorder(theme),
  }),
  hover: () => ({ transition: { duration: 0.3 }, outline: redBrdr }),
  focus: () => ({ outline: redBrdr, transition: { duration: 0.3 } }),
};
