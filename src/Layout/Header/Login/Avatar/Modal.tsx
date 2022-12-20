import { Lists } from './Lists';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { OverlayBg } from '../../../../Tools/Overlay';
import { AnimatePresence, motion } from 'framer-motion';
import { menuModalVar } from '../../../../../styles/variants';

interface IAvatarModal {
  _data: {
    theme: boolean;
    modal: boolean;
    setModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const AvatarModal = ({ _data }: IAvatarModal) => {
  const { modal, theme, setModal } = _data;
  const onClick = () => setModal((p) => !p);
  const closeModal = () => setModal(false);
  return (
    <AnimatePresence>
      {modal && (
        <>
          <Cont
            exit="exit"
            initial="initial"
            animate="animate"
            onClick={onClick}
            variants={menuModalVar}
          >
            <Lists theme={theme} />
          </Cont>
          <OverlayBg closeModal={closeModal} />
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(motion.div)`
  top: 60%;
  left: 50%;
  z-index: 100;
  position: absolute;
  border-radius: 5px;
  transform: translateX(-50%);
  color: ${(p) => p.theme.color.font};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
  border: 2px solid ${(p) => p.theme.color.font};
  ul {
    padding: 5px 0;
  }
`;
