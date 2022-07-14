import styled from '@emotion/styled';
import { DeleteBoard } from '../../../../Delete';
import { Btn } from '../../../../../Style/Button';
import { CancelEditBoard } from '../../../../Edit/Cancel';
import { Dispatch, SetStateAction, useState } from 'react';
import { IconBtn } from '../../../../../Style/Button/IconBtn';
import { EditBackground } from '../../../../Edit/Background';
import { DimBackground, Modal } from '../../../../../../../styles/global';

interface ISetting {
  edit: boolean;
  editBg: boolean;
  setting: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setPreview: Dispatch<SetStateAction<string>>;
  setEditBg: Dispatch<SetStateAction<boolean>>;
  setSetting: Dispatch<SetStateAction<boolean>>;
}
export const SettingWrap = ({
  edit,
  editBg,
  setting,
  setEdit,
  setEditBg,
  setPreview,
  setSetting,
}: ISetting) => {
  const handleClick = (type: string) => {
    setSetting(false);
    if (type === 'edit-board') return setEdit(true);
    if (type === 'delete-board') return setDeleteBoard(true);
  };
  const [cancel, setCancel] = useState(false);
  const [deleteBoard, setDeleteBoard] = useState(false);
  return (
    <>
      {!edit && !editBg && (
        <IconBtn
          size="2.2rem"
          type="button"
          svgType="setting"
          isClicked={edit}
          onClick={() => setSetting((p) => !p)}
        />
      )}
      <IconBtn
        size="2.2rem"
        type="button"
        svgType="landscape"
        isDisable={edit}
        isClicked={editBg}
        onClick={() => {
          setEdit(false);
          setEditBg((p) => !p);
        }}
      />
      {editBg && (
        <EditBackground setPreview={setPreview} setEditBg={setEditBg} />
      )}
      {setting && (
        <>
          <Setting>
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
          </Setting>
          <DimBackground zIndex={100} onClick={() => setSetting(false)} />
        </>
      )}
      {edit && (
        <>
          <IconBtn
            size="2rem"
            type="button"
            svgType="undo"
            isClicked={edit}
            onClick={() => setCancel(true)}
          />
        </>
      )}
      {deleteBoard && <DeleteBoard openModal={setDeleteBoard} />}
      {cancel && <CancelEditBoard setEdit={setEdit} setCancel={setCancel} />}
    </>
  );
};
const Setting = styled(Modal)`
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
