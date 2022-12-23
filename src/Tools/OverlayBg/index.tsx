import styled from '@emotion/styled';
import { opacityVar } from '../../../styles/variants';
import { AnimatePresence, motion } from 'framer-motion';

interface IOverlayBg {
  dark?: number;
  zIndex?: number;
  closeModal?: () => void;
}
export const OverlayBg = ({ dark, zIndex, closeModal }: IOverlayBg) => {
  return (
    <AnimatePresence>
      <Cont
        dark={dark}
        zindex={zIndex}
        variants={opacityVar}
        onClick={closeModal}
        exit="exit"
        animate="animate"
        initial="initial"
        className="overlay"
      />
    </AnimatePresence>
  );
};
export const Cont = styled(motion.div)<{ dark?: number; zindex?: number }>`
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${(p) => (p.zindex ? p.zindex : '99')};
  background-color: ${(p) => p.dark && `rgba(0, 0, 0, ${p.dark})`};
`;
