import styled from '@emotion/styled';
import { OverlayBg } from '../OverlayBg';
import { Modal } from '../../../styles/global';
import { color, variants } from '../../../styles/variants';
import { AnimatePresence, motion } from 'framer-motion';

interface ILoadingModal {
  theme: boolean;
  layoutId?: string;
}
export const LoadingModal = ({ theme, layoutId }: ILoadingModal) => {
  return (
    <>
      <Cont
        exit="exit"
        initial="initial"
        animate="animate"
        className="loading"
        custom={theme}
        variants={variants}
        layoutId={layoutId}
      >
        <motion.span
          animate="animate"
          variants={{
            animate: {
              opacity: 1,
              transition: {
                duration: 1.5,
                repeat: Infinity,
              },
            },
          }}
        >
          Loading...
        </motion.span>
        <motion.svg viewBox="0 0 512 512">
          <motion.path
            exit="exit"
            initial="initial"
            animate="animate"
            custom={theme}
            variants={svgVar}
            d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"
          />
        </motion.svg>
      </Cont>
      <OverlayBg dark={0.5} zIndex={888} />
    </>
  );
};
const Cont = styled(Modal)`
  top: 50vh;
  gap: 1rem;
  z-index: 999;
  padding: 4rem;
  font-size: 2.2rem;
  span {
    opacity: 0;
  }
  svg {
    width: 3rem;
    height: 3rem;
  }
`;
const svgVar = {
  initial: (theme: boolean) => ({
    fill: color(theme),
  }),
  animate: (theme: boolean) => ({
    rotate: '360deg',
    fill: color(theme),
    transition: {
      duration: 1.5,
      repeat: Infinity,
    },
  }),
};
