import {
  menuModalVar,
  opacityVar,
  TweenTrans,
} from '../../../../../styles/variants';
import { Lists } from './Lists';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { Overlay } from '../../../../../styles/global';
import { AnimatePresence, motion } from 'framer-motion';

interface IUserMenuModal {
  theme: boolean;
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
}
export const IconModal = ({ modal, theme, setModal }: IUserMenuModal) => {
  return (
    <AnimatePresence>
      {modal && (
        <>
          <Modal
            exit="exit"
            initial="initial"
            animate="animate"
            variants={menuModalVar}
            transition={TweenTrans}
            onClick={() => setModal((p) => !p)}
          >
            <Lists theme={theme} />
          </Modal>
          <Overlay
            exit="exit"
            initial="initial"
            animate="animate"
            variants={opacityVar}
            className="overlay"
            onClick={() => setModal(false)}
          />
        </>
      )}
    </AnimatePresence>
  );
};
const Modal = styled(motion.div)`
  z-index: 999;
  top: 60%;
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
  border-radius: 5px;
  color: ${(p) => p.theme.color.font};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
  border: 2px solid ${(p) => p.theme.color.font};
  ul {
    padding: 5px 0;
  }
`;
