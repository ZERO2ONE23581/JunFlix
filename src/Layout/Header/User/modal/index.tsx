import { Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';
import { Overlay } from '../../../../../styles/global';
import { AnimatePresence, motion } from 'framer-motion';
import { menuModalVar, TweenTrans } from '../../../../../styles/variants';
import { ListWrap } from './list_wrap';

interface IUserMenuModal {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
}
export const UserMenuModal = ({ modal, setModal }: IUserMenuModal) => {
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
            <ListWrap />
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
    min-width: 10em;
  }
`;
