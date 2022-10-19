import { Overlay } from '../../styles/global';
import { opacityVar } from '../../styles/variants';

interface IOverlayBg {
  dark?: number;
  zIndex?: number;
  closeModal?: () => void;
}
export const OverlayBg = ({ dark, zIndex, closeModal }: IOverlayBg) => {
  return (
    <>
      <Overlay
        className="overlay-bg"
        dark={dark}
        zindex={zIndex}
        exit="exit"
        animate="animate"
        initial="initial"
        variants={opacityVar}
        onClick={closeModal}
      />
    </>
  );
};
