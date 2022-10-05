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
