import { AnimatePresence } from 'framer-motion';
import { Overlay } from '../../styles/global';
import { opacityVar } from '../../styles/variants';

interface IOverlayBg {
  dark?: number;
  zIndex?: number;
  closeModal?: () => void;
}
export const OverlayBg = ({ dark, zIndex, closeModal }: IOverlayBg) => {
  return (
    <AnimatePresence>
      <Overlay
        className="overlay"
        dark={dark}
        zindex={zIndex}
        variants={opacityVar}
        onClick={closeModal}
        animate="animate"
        initial="initial"
        exit="exit"
      />
    </AnimatePresence>
  );
};
