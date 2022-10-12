import styled from '@emotion/styled';
import { ModalLists } from './modal_lists';
import { Dispatch, SetStateAction } from 'react';
import { ITheme } from '../../../../../styles/theme';
import { Overlay } from '../../../../../styles/global';
import { AnimatePresence, motion } from 'framer-motion';
import { menuModalVar, TweenTrans } from '../../../../../styles/variants';

interface IUserMenuModal extends ITheme {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
}
export const UserMenuModal = ({ modal, theme, setModal }: IUserMenuModal) => {
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
            <ModalLists theme={theme} />
          </Modal>
          <Overlay
            className="overlay"
            animate={{ opacity: 1 }}
            onClick={() => setModal(false)}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
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
