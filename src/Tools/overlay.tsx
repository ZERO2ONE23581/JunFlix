import { Overlay } from '../../styles/global';
import { opacityVar } from '../../styles/variants';

interface IOverlayBg {
  closeModal?: () => void;
}
export const OverlayBg = ({ closeModal }: IOverlayBg) => {
  return (
    <>
      <Overlay
        exit="exit"
        animate="animate"
        initial="initial"
        variants={opacityVar}
        onClick={closeModal}
      />
    </>
  );
};
