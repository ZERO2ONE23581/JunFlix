import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import { EditBoardAvatar } from '../../Avatar/Board/Edit';
import { ConfirmModal } from '../../../Tools/Modal';
import { Answer } from '../../../Tools/Modal/Answer';
import { Svg } from '../../../Tools/Svg';
import { BtnWrap } from '../Update/BtnWrap';

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
          <Svg
            size="2.2rem"
            type="question"
            onClick={() => setAnwser((p) => !p)}
          />
          <Svg
            size="2.2rem"
            type="compass"
            onClick={() => router.push(`/boards`)}
          />
        </>
      )}
      {!(edit || avatar) && <BtnWrap setEdit={setEdit} setAvatar={setAvatar} />}
      {answer && <Answer type="edit-board" closeModal={setAnwser} />}
      {edit && (
        <>
          <Svg size="2rem" type="undo" onClick={() => setCancel(true)} />
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
          setCancel={setCancel}
          setPreview={setPreview}
        />
      )}
    </Cont>
  );
};
const Cont = styled.article`
  top: 35px;
  right: 40px;
  position: absolute;
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
