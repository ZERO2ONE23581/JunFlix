import { Lists } from './Lists';
import styled from '@emotion/styled';
import { IResponsive } from '../../types/global';
import { Dispatch, SetStateAction } from 'react';
import { OverlayBg } from '../../Tools/OverlayBg';
import { fromTopVar } from '../../../styles/variants';
import { AnimatePresence, motion } from 'framer-motion';

interface IAvatarModal extends IResponsive {
  _data: {
    modal: boolean;
    setModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const AvatarModal = ({ _data, _res }: IAvatarModal) => {
  const { isMobile } = _res;
  const { modal, setModal } = _data;
  const onClick = () => setModal((p) => !p);
  const closeModal = () => setModal(false);
  return (
    <AnimatePresence>
      {modal && (
        <>
          <Cont isMobile={isMobile}>
            <Modal
              exit="exit"
              initial="initial"
              animate="animate"
              className="modal"
              onClick={onClick}
              variants={fromTopVar}
            >
              <Lists _res={_res} />
            </Modal>
          </Cont>
          <OverlayBg closeModal={closeModal} />
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled.div<{ isMobile: boolean }>`
  top: 100%;
  right: 0rem;
  z-index: 100;
  position: absolute;
`;
const Modal = styled(motion.div)`
  border-radius: 5px;
  padding: 1rem 2rem;
  color: ${(p) => p.theme.color.font};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
  border: 2px solid ${(p) => p.theme.color.font};
`;
