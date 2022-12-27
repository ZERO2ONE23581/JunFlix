import { Next } from './Next';
import { Txts } from './Txts';
import { useState } from 'react';
import styled from '@emotion/styled';
import { Svg } from '../../../Tools/Svg';
import { IBoardSetting } from '../Read/Modals';
import { AnimatePresence } from 'framer-motion';
import { Mob, Modal } from '../../../../styles/global';
import { OverlayBg } from '../../../Tools/OverlayBg';
import { mobVars } from '../../../../styles/variants';
import { useCapLetters, useResponsive } from '../../../libs/client/useTools';

export const DeleteBoard = ({ _data, _modal }: IBoardSetting) => {
  const title = 'delete board';
  const { isDesk } = useResponsive();
  const size = isDesk ? '2rem' : '4rem';
  const [isDel, setIsDel] = useState(false);
  const { POST, theme, layoutId, board } = _data;
  const { Loading, type, loading, closeModal, setLoading } = _modal;
  const modal = !Loading && Boolean(type === 'delete-board');
  const clickClose = () => {
    closeModal();
    setIsDel(false);
  };
  return (
    <AnimatePresence>
      {modal && (
        <>
          <Cont isDesk={isDesk}>
            <Modal
              exit="exit"
              className="modal"
              initial="initial"
              animate="animate"
              variants={mobVars}
              layoutId={layoutId}
              custom={{ theme, isDesk, isRed: true }}
            >
              <Svg
                type="close"
                theme={theme}
                item={{ size }}
                onClick={clickClose}
              />
              <h1>{useCapLetters(title)}</h1>
              <Txts _data={{ theme, isDel, setIsDel }} />
              <Next
                _data={{ theme, POST, loading, isDel, setLoading, board }}
              />
            </Modal>
          </Cont>
          <OverlayBg closeModal={clickClose} />
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(Mob)`
  .modal {
    padding: 1.5rem 1rem 2rem;
    color: ${(p) => p.theme.color.logo};
    font-size: ${(p) => (p.isDesk ? '1.2rem' : '2.8rem')};
    .kor {
      font-size: ${(p) => (p.isDesk ? '1.2rem' : '2.5rem')};
    }
    h1 {
      margin-bottom: 1rem;
      font-size: ${(p) => (p.isDesk ? '2rem' : '3.5rem')};
    }
    button {
      margin: 2rem auto;
      width: ${(p) => (p.isDesk ? '1.2rem' : '80%')};
      font-size: ${(p) => (p.isDesk ? '1.2rem' : '2.8rem')};
    }
  }
`;
