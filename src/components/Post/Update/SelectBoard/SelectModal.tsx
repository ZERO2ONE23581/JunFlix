import { Layer } from './Layer';
import styled from '@emotion/styled';
import { QuickSave } from './QuickSave';
import { AnimatePresence } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { FlexCol_ } from '../../../../../styles/global';
import { OverlayBg } from '../../../../Tools/OverlayBg';
import { color } from '../../../../../styles/variants';
import { BoardsList } from '../../Create/Select/MyBoards';
import { PostSt } from '../../../../../styles/post';
import { useResponsive } from '../../../../libs/client/useTools';

export const SelectModal = ({ _boolean, _data, _set }: ISelectModal) => {
  const { host_id, layoutId } = _data;
  const { theme, isUpdate, selectModal } = _boolean;
  const { setQuickSave, setNewBoardId, setSelectModal } = _set;
  const _select = {
    theme,
    host_id,
    clickQuick: () => selectClick('quick', 0)!,
    clickBoard: (id: number) => selectClick('board', id),
  };
  const open = isUpdate && selectModal;
  const closeSelect = () => setSelectModal(false);
  const selectClick = (type: string, id: number) => {
    if (type === 'quick') setQuickSave(true);
    if (type === 'board' && id) {
      setQuickSave(false);
      setNewBoardId!(id);
    }
    setSelectModal(false);
  };
  const { isDesk } = useResponsive();
  return (
    <AnimatePresence>
      {open && (
        <Container isDesk={isDesk}>
          <Cont
            exit="exit"
            custom={theme}
            variants={vars}
            animate="animate"
            initial="initial"
            className="select_modal"
            layoutId={layoutId + 'submit'}
          >
            <Layer isDesk={isDesk} theme={theme} closeModal={closeSelect} />
            <Wrap isDesk={isDesk}>
              <QuickSave _data={{ ..._select }} />
              <BoardsList _data={{ ..._select }} />
            </Wrap>
          </Cont>
          <OverlayBg dark={0.6} zIndex={113} />
        </Container>
      )}
    </AnimatePresence>
  );
};
const Container = styled.article<{ isDesk: boolean }>`
  .select_modal {
    font-size: ${(p) => (p.isDesk ? '1.5rem' : '3rem')};
    .board-title {
      h2 {
        font-size: ${(p) => (p.isDesk ? '1.5rem' : '3rem')};
      }
    }
    .board_cover {
      width: fit-content;
      img {
        border-radius: 10px;
        width: ${(p) => (p.isDesk ? '3.5rem' : '8rem')};
        height: ${(p) => (p.isDesk ? '3.5rem' : '8rem')};
      }
    }
  }
`;
const Wrap = styled(FlexCol_)`
  gap: 1.5rem;
  padding: 0 2rem;
`;
const Cont = styled(PostSt)`
  z-index: 114;
`;
interface ISelectModal {
  _boolean: {
    theme: boolean;
    isUpdate: boolean;
    selectModal: boolean;
  };
  _data: {
    host_id: number;
    layoutId: string;
  };
  _set: {
    setQuickSave: Dispatch<SetStateAction<boolean>>;
    setNewBoardId: Dispatch<SetStateAction<number>>;
    setSelectModal: Dispatch<SetStateAction<boolean>>;
  };
}
const vars = {
  exit: () => ({ opacity: 0 }),
  initial: () => ({ opacity: 0 }),
  animate: (theme: boolean) => ({
    opacity: 1,
    color: color(theme),
    transition: { duration: 0.5 },
    backgroundColor: color(!theme),
  }),
};
