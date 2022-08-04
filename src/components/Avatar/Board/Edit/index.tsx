import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useState } from 'react';
import { IconBtn } from '../../../Tools/Button/Icon';
import { EditBoardAvatarForm } from './Form';

interface IEditAvatar {
  avatar: boolean;
  setPreview: Dispatch<SetStateAction<string>>;
  setAvatar: Dispatch<SetStateAction<boolean>>;
}
export const EditBoardAvatar = ({
  avatar,
  setPreview,
  setAvatar,
}: IEditAvatar) => {
  const [delModal, setDelModal] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
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
          setIsClicked={setIsClicked}
        />
        {isClicked && (
          <IconBtn
            size="2rem"
            type="button"
            svgType="save"
            isClicked={saveModal}
            onClick={() => setSaveModal(true)}
          />
        )}
        <IconBtn
          type="button"
          size="2.2rem"
          svgType="eraser"
          isClicked={delModal}
          onClick={() => setDelModal(true)}
        />
        <IconBtn
          size="2rem"
          type="button"
          svgType="undo"
          isClicked={avatar}
          onClick={() => {
            setPreview('');
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
