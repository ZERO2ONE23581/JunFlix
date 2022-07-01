import styled from '@emotion/styled';
import { Btn } from '../../Style/Button';
import { IconBtn } from '../../Style/Button/IconBtn';
import { Dispatch, SetStateAction, useState } from 'react';
import { DimBackground, Modal } from '../../../../styles/global';
import { CancelEditBoard } from './CancelEditBoard';
import { SaveEditBoard } from './SaveEditBoard';

interface IBoardSettingProps {
  isData: boolean;
  loading: boolean;
  editBoard: boolean;
  saveEditBoard: boolean;
  setEditBoard: Dispatch<SetStateAction<boolean>>;
  setSaveEditBoard: Dispatch<SetStateAction<boolean>>;
  setDeleteBoard: Dispatch<SetStateAction<boolean>>;
  setCreatePost: Dispatch<SetStateAction<boolean>>;
}
export const Setting = ({
  isData,
  loading,
  editBoard,
  saveEditBoard,
  setEditBoard,
  setDeleteBoard,
  setCreatePost,
  setSaveEditBoard,
}: IBoardSettingProps) => {
  const [setting, setSetting] = useState(false);
  const [cancelEditBoard, setCancelEditBoard] = useState(false);
  const handleClick = (type: string) => {
    setSetting(false);
    if (type === 'edit-board') return setEditBoard(true);
    if (type === 'delete-board') return setDeleteBoard(true);
    if (type === 'create-post') return setCreatePost(true);
  };
  return (
    <>
      <Cont>
        {!editBoard && (
          <IconBtn
            type="button"
            svgType="setting"
            isClicked={setting}
            onClick={() => setSetting((p) => !p)}
          />
        )}
        {editBoard && (
          <IconBtn
            type="button"
            svgType="edit-board"
            isClicked={editBoard}
            onClick={() => setCancelEditBoard(true)}
          />
        )}
        {!editBoard && setting && (
          <>
            <BtnWrap>
              <Btn
                name="보드 수정하기"
                type="button"
                onClick={() => handleClick('edit-board')}
              />
              <Btn
                name="보드 삭제하기"
                type="button"
                onClick={() => handleClick('delete-board')}
              />
              <Btn
                name="포스트 만들기"
                type="button"
                onClick={() => handleClick('create-post')}
              />
            </BtnWrap>
            <DimBackground zIndex={100} onClick={() => setSetting(false)} />
          </>
        )}
      </Cont>
      {cancelEditBoard && <CancelEditBoard closeModal={setCancelEditBoard} />}
      {!isData && saveEditBoard && (
        <SaveEditBoard loading={loading} closeModal={setSaveEditBoard} />
      )}
    </>
  );
};
const Cont = styled.article`
  right: 7.7%;
  bottom: 40%;
  z-index: 101;
  position: fixed;
  svg {
    width: 2.5rem;
    height: 2.5rem;
    /* fill: ${(p) => p.theme.color.bg}; */
  }
`;
const BtnWrap = styled(Modal)`
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
