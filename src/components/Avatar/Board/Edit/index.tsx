import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import { Svg } from '../../../Tools/Svg';
import { EditBoardAvatarForm } from './Form';

interface IEditAvatar {
  avatar: boolean;
  setPreview: Dispatch<SetStateAction<string>>;
  setAvatar: Dispatch<SetStateAction<boolean>>;
  setCancel: Dispatch<SetStateAction<boolean>>;
}
export const EditBoardAvatar = ({
  avatar,
  setCancel,
  setAvatar,
  setPreview,
}: IEditAvatar) => {
  const router = useRouter();
  const [delModal, setDelModal] = useState(false);
  const [isclicked, setisclicked] = useState(false);
  const [saveModal, setSaveModal] = useState(false);
  return (
    <>
      <Cont>
        <EditBoardAvatarForm
          saveModal={saveModal}
          setSaveModal={setSaveModal}
          delModal={delModal}
          setDelModal={setDelModal}
          setAvatar={setAvatar}
          setPreview={setPreview}
          setisclicked={setisclicked}
        />
        {isclicked && (
          <Svg size="2rem" type="save" onClick={() => setSaveModal(true)} />
        )}
        <Svg size="2.2rem" type="eraser" onClick={() => setDelModal(true)} />
        <Svg
          size="2rem"
          type="undo"
          onClick={() => {
            setPreview('');
            setCancel(false);
            setAvatar(false);
          }}
        />
      </Cont>
    </>
  );
};
const Cont = styled.article`
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
