import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { OverlayBg } from '../overlay';
import { Modal } from '../../../styles/global';
import { variants } from '../../../styles/variants';

interface ILoadingModal {
  theme: boolean;
  zindex?: number;
  layoutId?: string;
}
export const LoadingModal = ({ theme, zindex, layoutId }: ILoadingModal) => {
  return (
    <>
      <Cont
        exit="exit"
        initial="initial"
        animate="animate"
        className="loading"
        layoutId={layoutId}
        custom={theme}
        variants={variants}
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
      <OverlayBg dark={0.3} zIndex={99999} />
    </>
  );
};
const Cont = styled(Modal)`
  top: 20rem;
  z-index: 999;
  width: 25vw;
  height: 40vh;
  min-width: 400px;
  min-height: 300px;
  gap: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  span {
    opacity: 0;
    font-size: 2em;
  }
  svg {
    width: 3em;
    height: 3em;
  }
`;
const svgVar = {
  initial: (theme: boolean) => ({
    fill: theme ? '#000000' : '#ffffff',
  }),
  animate: (theme: boolean) => ({
    rotate: '360deg',
    transition: {
      duration: 1.5,
      repeat: Infinity,
    },
    fill: theme ? '#000000' : '#ffffff',
  }),
};
