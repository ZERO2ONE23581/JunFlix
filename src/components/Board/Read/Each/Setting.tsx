import { BtnWrap } from '../../Update/BtnWrap';
import { EditBoardAvatar } from '../../../Avatar/Board/Edit';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useState } from 'react';
import { IconBtn } from '../../../Tools/Button/Icon';
import { ConfirmModal } from '../../../Tools/Modal';

interface ISetting {
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setPreview: Dispatch<SetStateAction<string>>;
}
export const Setting = ({ edit, setEdit, setPreview }: ISetting) => {
  const [avatar, setAvatar] = useState(false);
  const [cancel, setCancel] = useState(false);
  return (
    <Cont>
      {!(edit || avatar) && <BtnWrap setEdit={setEdit} setAvatar={setAvatar} />}
      {edit && (
        <>
          <IconBtn
            size="2rem"
            type="button"
            svgType="undo"
            isClicked={edit}
            onClick={() => setCancel(true)}
          />
          {cancel && (
            <ConfirmModal
              setEdit={setEdit}
              closeModal={setCancel}
              type="cancel-update-board"
            />
          )}
        </>
      )}
      {avatar && (
        <EditBoardAvatar
          avatar={avatar}
          setAvatar={setAvatar}
          setPreview={setPreview}
        />
      )}
    </Cont>
  );
};
const Cont = styled.article`
  top: 35px;
  right: 80px;
  position: absolute;
`;
