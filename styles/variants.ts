//theme은 dark가 default, 즉 boolean값은 기본적으로 false가 들어오게 됨.
export const redColor = '#E50914';
export const blackColor = '#000000';
export const whiteColor = '#ffffff';
export const transBrdr = `1px solid transparent`;
export const redBrdr = `2px solid ${redColor}`;
export const whiteBrdr = `2px solid ${whiteColor}`;
export const blackBrdr = `2px solid ${blackColor}`;
export const TweenTrans = { type: 'tween', stiffness: 50 };
export const SpringTrans = { type: 'spring', stiffness: 100 };
export const color = (dark: boolean) => (dark ? blackColor : whiteColor);
export const border = (dark: boolean) => (dark ? blackBrdr : whiteBrdr);
export const TransBorder = (dark: boolean) => (dark ? whiteBrdr : transBrdr);

export const greyColor = '#bdc3c7';
export const greyBrdr = `1px solid ${greyColor}`;
export const GreyBorder = (dark: boolean) => (dark ? whiteBrdr : greyBrdr);

export const myboxVar = {
  initial: (theme: boolean) => ({
    opacity: 0,
  }),
  animate: (theme: boolean) => ({
    opacity: 1,
    color: color(theme),
    border: TransBorder(!theme),
    transition: { duration: 0.3 },
  }),
  exit: (theme: boolean) => ({
    opacity: 0,
  }),
  hover: () => ({
    scale: 1.05,
    color: redColor,
    border: redBrdr,
    transition: { duration: 0.3 },
  }),
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
  initial: (theme: boolean) => ({
    scale: 0.2,
    opacity: 0,
    color: color(theme),
    backgroundColor: color(!theme),
  }),
  animate: (theme: boolean) => ({
    opacity: 1,
    scale: 1,
    color: color(theme),
    backgroundColor: color(!theme),
    transition: { duration: 0.5 },
  }),
  exit: (theme: boolean) => ({
    opacity: 0,
    scale: 0.2,
    transition: { duration: 0.5 },
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
    transition: { duration: 0.3 },
  }),
  exit: (theme: boolean) => ({
    opacity: 0,
    transition: { duration: 0.3 },
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
    color: isFollowing ? whiteColor : color(!theme),
    backgroundColor: isFollowing ? redColor : color(theme),
  }),
  animate: ({ theme, isClicked, isFollowing }: any) => ({
    transition: { duration: 0.3 },
    color: isFollowing ? whiteColor : color(!theme),
    backgroundColor: isFollowing ? redColor : color(theme),
  }),
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
