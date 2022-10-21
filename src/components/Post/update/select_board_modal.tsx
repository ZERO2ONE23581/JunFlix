import useSWR from 'swr';
import { Dispatch } from 'react';
import { SetStateAction } from 'react';
import { Modal } from '../../../../styles/global';
import { IGetBoards } from '../../../types/board';
import { OverlayBg } from '../../../Tools/overlay';
import { Layer } from '../select_board_modal_layer';
import { BoardMap } from './select_board_modal_map';
import { variants } from '../../../../styles/variants';

interface ISelectBoard {
  modal: boolean;
  theme: boolean;
  host_id: number;
  closeModal: () => void;
  setChosen_board_id: Dispatch<SetStateAction<number>>;
  setSelectQuick: Dispatch<SetStateAction<boolean>>;
  setSelectModal: Dispatch<SetStateAction<boolean>>;
}
export const SelectBoardModal = ({
  modal,
  theme,
  host_id,
  closeModal,
  setSelectQuick,
  setSelectModal,
  setChosen_board_id,
}: ISelectBoard) => {
  const { data } = useSWR<IGetBoards>(`/api/board/all`);
  const myBoards = data?.boards?.filter((e) => e.host_id === host_id);
  const open = Boolean(myBoards?.length! > 0 && modal);
  const onSelect = (id: number, type: string) => {
    if (type === 'quick' && !id) setSelectQuick(true);
    else {
      setChosen_board_id(id);
      setSelectQuick(false);
    }
    setSelectModal(false);
  };
  //
  return (
    <>
      {open && (
        <>
          <Modal
            exit="exit"
            animate="animate"
            initial="initial"
            custom={theme}
            variants={variants}
          >
            <Layer
              theme={theme}
              title="select board"
              closeModal={closeModal}
              clickSkip={() => {}}
            />
            <BoardMap
              theme={theme}
              host_id={host_id}
              clickQuickSave={() => onSelect(0, 'quick')}
              clickBoard={(id: number) => onSelect(id, 'select')}
            />
          </Modal>
          <OverlayBg zIndex={112} closeModal={closeModal} />
        </>
      )}
    </>
  );
};
