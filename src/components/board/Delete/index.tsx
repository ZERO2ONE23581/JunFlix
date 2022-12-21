import { Next } from './Next';
import { Txts } from './Txts';
import { useState } from 'react';
import styled from '@emotion/styled';
import { Svg } from '../../../Tools/Svg';
import { IBoardSetting } from '../Read/Modals';
import { AnimatePresence } from 'framer-motion';
import { Modal } from '../../../../styles/global';
import { OverlayBg } from '../../../Tools/OverlayBg';
import { modalVar } from '../../../../styles/variants';
import { useCapLetters } from '../../../libs/client/useTools';

export const DeleteBoard = ({ _data, _modal }: IBoardSetting) => {
  const title = 'delete board';
  const [isDel, setIsDel] = useState(false);
  const { POST, theme, layoutId, board } = _data;
  const { Loading, type, loading, closeModal, setLoading } = _modal;
  const modal = !Loading && Boolean(type === 'delete-board');
  const clickClose = () => {
    closeModal();
    setIsDel(false);
  };
  return (
    <>
      <AnimatePresence>
        {modal && (
          <Cont
            exit="exit"
            initial="initial"
            animate="animate"
            custom={theme}
            layoutId={layoutId}
            variants={modalVar}
          >
            <Svg
              type="close"
              theme={theme}
              onClick={clickClose}
              item={{ size: '2rem' }}
            />
            <h1>{useCapLetters(title)}</h1>
            <Txts _data={{ theme, isDel, setIsDel }} />
            <Next _data={{ theme, POST, loading, isDel, setLoading, board }} />
          </Cont>
        )}
      </AnimatePresence>
      {modal && <OverlayBg closeModal={clickClose} />}
    </>
  );
};
const Cont = styled(Modal)`
  h1 {
    color: ${(p) => p.theme.color.logo};
  }
`;
