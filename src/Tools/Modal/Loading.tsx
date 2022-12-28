import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { OverlayBg } from '../OverlayBg';
import { Modal } from '../../../styles/global';
import { color, variants } from '../../../styles/variants';
import { useResponsive } from '../../libs/client/useTools';

interface ILoadingModal {
  theme: boolean;
  layoutId?: string;
}
export const LoadingModal = ({ theme, layoutId }: ILoadingModal) => {
  const { isDesk } = useResponsive();
  return (
    <Cont isDesk={isDesk}>
      <Modal
        exit="exit"
        custom={theme}
        initial="initial"
        animate="animate"
        variants={variants}
        layoutId={layoutId}
        className="loading_modal"
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
      </Modal>
      <OverlayBg dark={0.5} zIndex={888} />
    </Cont>
  );
};
const Cont = styled.section<{ isDesk: boolean }>`
  .loading_modal {
    z-index: 999;
    padding: 4rem;
    justify-content: center;
    top: ${(p) => (p.isDesk ? '50vh' : '0vh')};
    gap: ${(p) => (p.isDesk ? '1rem' : '3rem')};
    font-size: ${(p) => (p.isDesk ? '2.2rem' : '6rem')};
    width: ${(p) => (p.isDesk ? 'fit-content' : '100%')};
    height: ${(p) => (p.isDesk ? 'fit-content' : '100%')};
    svg {
      width: ${(p) => (p.isDesk ? '3rem' : '7rem')};
      height: ${(p) => (p.isDesk ? '3rem' : '7rem')};
    }
    span {
      opacity: 0;
    }
  }
`;
const svgVar = {
  animate: (theme: boolean) => ({
    transition,
    rotate: '360deg',
    fill: color(theme),
  }),
};
const transition = { duration: 1.5, repeat: Infinity };
