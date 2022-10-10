import { Svg } from '../Svg';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { ITheme } from '../../../styles/theme';
import { AnimatePresence, motion } from 'framer-motion';
import { TweenTrans } from '../../../styles/variants';

export interface IBtns extends ITheme {
  setTheme: Dispatch<SetStateAction<boolean>>;
}
export const ThemeBtn = ({ setTheme, theme }: IBtns) => {
  return (
    <AnimatePresence>
      <Cont
        initial="initial"
        animate="aniamte"
        exit={'exit'}
        transition={TweenTrans}
      >
        {!theme && (
          <motion.div
            variants={themeVar}
            initial="initial"
            animate="aniamte"
            exit={'exit'}
            transition={TweenTrans}
          >
            <h1>hello</h1>
            <Svg
              theme={theme}
              size="2.5rem"
              type="moon"
              onClick={() => setTheme(true)}
            />
          </motion.div>
        )}
        {theme && (
          <motion.div
            transition={TweenTrans}
            variants={themeVar}
            initial="initial"
            animate="aniamte"
            exit={'exit'}
          >
            <h1>world</h1>
            <Svg
              theme={theme}
              size="2.5rem"
              type="sun"
              onClick={() => setTheme(false)}
            />
          </motion.div>
        )}
      </Cont>
    </AnimatePresence>
  );
};
const themeVar = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
    transition: { duration: 1 },
  },
  exit: {
    opacity: 0,
  },
};
const Cont = styled(motion.div)`
  top: 10em;
  right: 3em;
  z-index: 9999;
  position: fixed;
  color: red;
  border: 2px solid blue;
`;
