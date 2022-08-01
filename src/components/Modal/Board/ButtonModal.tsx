import styled from '@emotion/styled';
import { DeleteBoard } from './DeleteBoardModal';
import { Btn } from '../../Style/Button';
import { Dispatch, SetStateAction, useState } from 'react';
import { DimBackground, Modal } from '../../../../styles/global';

interface IBtnModal {
  setEdit: Dispatch<SetStateAction<boolean>>;
  setModal: Dispatch<SetStateAction<boolean>>;
  setAvatar: Dispatch<SetStateAction<boolean>>;
}
export const EditBtns = ({ setModal, setEdit, setAvatar }: IBtnModal) => {
  const handleClick = (type: string) => {
    setModal(false);
    if (type === 'edit-board') return setEdit(true);
    if (type === 'delete-board') return setDelBoard(true);
    if (type === 'edit-background') return setAvatar(true);
  };
  const [delBoard, setDelBoard] = useState(false);
  return (
    <>
      <Cont>
        <Btn
          name="보드 수정하기"
          type="button"
          onClick={() => handleClick('edit-board')}
        />
        <Btn
          name="보드 배경수정하기"
          type="button"
          onClick={() => handleClick('edit-background')}
        />
        <Btn
          name="보드 삭제하기"
          type="button"
          onClick={() => handleClick('delete-board')}
        />
      </Cont>
      {delBoard && <DeleteBoard setDelBoard={setDelBoard} />}
      <DimBackground zIndex={100} onClick={() => setModal(false)} />
    </>
  );
};
const Cont = styled(Modal)`
  z-index: 201;
  width: 40vw;
  gap: 0;
  padding: 0;
  border: none;
  overflow: hidden;
  border-radius: 5px;
  background-color: transparent;
  button {
    width: 100%;
    border-radius: 0%;
    border-bottom: 1px solid #2d3436;
    :nth-of-type(3) {
      border: none;
    }
  }
`;
