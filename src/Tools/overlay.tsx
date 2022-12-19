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
