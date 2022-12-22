import { Layer } from './Layer';
import styled from '@emotion/styled';
import { QuickSave } from './QuickSave';
import { AnimatePresence } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { FlexCol } from '../../../../../styles/global';
import { OverlayBg } from '../../../../Tools/OverlayBg';
import { variants } from '../../../../../styles/variants';
import { BoardsList } from '../../Create/Select/MyBoards';
import { PostModalStyle } from '../../../../../styles/post';

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
  return (
    <AnimatePresence>
      {open && (
        <>
          <Cont
            exit="exit"
            animate="animate"
            initial="initial"
            className="select-modal"
            custom={theme}
            variants={variants}
            layoutId={layoutId + 'submit'}
          >
            <Layer theme={theme} closeModal={closeSelect} />
            <FlexCol className="wrap">
              <QuickSave _data={{ ..._select }} />
              <BoardsList _data={{ ..._select }} />
            </FlexCol>
          </Cont>
          <OverlayBg dark={0.6} zIndex={113} />
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(PostModalStyle)`
  z-index: 114;
  .wrap {
    padding: 1rem 0.5rem;
    gap: 0.5rem;
  }
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
