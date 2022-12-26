import { Lists } from './Lists';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { OverlayBg } from '../../../../Tools/OverlayBg';
import { AnimatePresence, motion } from 'framer-motion';
import { IResponsive } from '../../../../types/global';
import { fromTopVar } from '../../../../../styles/variants';

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
          <Cont mobile={isMobile}>
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
const Cont = styled.div<{ mobile: boolean }>`
  top: 100%;
  right: 0rem;
  z-index: 100;
  position: absolute;
`;
const Modal = styled(motion.div)`
  border-radius: 5px;
  color: ${(p) => p.theme.color.font};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
  border: 2px solid ${(p) => p.theme.color.font};
  ul {
    padding: 5px 0;
  }
`;
const Mobile = styled(motion.div)`
  border-radius: 5px;
  color: ${(p) => p.theme.color.font};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
  border: 2px solid ${(p) => p.theme.color.font};
  ul {
    padding: 5px 0;
  }
`;
