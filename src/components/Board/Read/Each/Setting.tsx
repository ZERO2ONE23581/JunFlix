import { BtnWrap } from '../../Update/BtnWrap';
import { EditBoardAvatar } from '../../../Avatar/Board/Edit';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useState } from 'react';
import { IconBtn } from '../../../Tools/Button/Icon';
import { ConfirmModal } from '../../../Tools/Modal';
import { useRouter } from 'next/router';
import { Answer } from '../../../Tools/Modal/Answer';

interface ISetting {
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setPreview: Dispatch<SetStateAction<string>>;
}
export const Setting = ({ edit, setEdit, setPreview }: ISetting) => {
  const router = useRouter();
  const [avatar, setAvatar] = useState(false);
  const [answer, setAnwser] = useState(false);
  const [cancel, setCancel] = useState(false);
  return (
    <Cont>
      {!(edit || avatar) && (
        <>
          <IconBtn
            size="2.2rem"
            type="button"
            svgType="question"
            onClick={() => setAnwser((p) => !p)}
          />
          <IconBtn
            size="2.2rem"
            type="button"
            svgType="compass"
            onClick={() => router.push(`/all/boards`)}
          />
        </>
      )}
      {!(edit || avatar) && <BtnWrap setEdit={setEdit} setAvatar={setAvatar} />}
      {answer && <Answer type="edit-board" closeModal={setAnwser} />}
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
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
