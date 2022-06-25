import styled from '@emotion/styled';
import { Btn } from '../../../Style/Button';
import { Dispatch, SetStateAction, useState } from 'react';
import { IconBtn } from '../../../Style/Button/IconBtn';
import { ModalClose } from '../../../../../styles/global';

interface ISettingBtnProps {
  onEdit: Dispatch<SetStateAction<boolean>>;
  onDelete: Dispatch<SetStateAction<boolean>>;
  onCreate: Dispatch<SetStateAction<boolean>>;
}

export const BoardSetting = ({
  onEdit,
  onDelete,
  onCreate,
}: ISettingBtnProps) => {
  const clickCreatePost = () => {
    onCreate(true);
    setOnSetting(false);
  };
  const [onSetting, setOnSetting] = useState(false);
  return (
    <>
      <Cont>
        <IconBtn
          isClicked={onSetting}
          svgType="setting"
          onClick={() => setOnSetting((p) => !p)}
        />
        {onSetting && (
          <BtnWrap>
            <Btn name="보드수정" type="button" onClick={() => onEdit(true)} />
            <Btn name="보드삭제" type="button" onClick={() => onDelete(true)} />
            <Btn type="button" name="게시물 작성" onClick={clickCreatePost} />
          </BtnWrap>
        )}
      </Cont>
      {onSetting && <SettingClose onClick={() => setOnSetting(false)} />}
    </>
  );
};
const SettingClose = styled(ModalClose)`
  top: -10%;
  left: -27%;
`;
const Cont = styled.div`
  top: 5%;
  right: 10%;
  position: absolute;
`;
const BtnWrap = styled.article`
  z-index: 999;
  width: 250%;
  top: 110%;
  right: -70%;
  overflow: hidden;
  border-radius: 3px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    width: 100%;
    border-radius: 0%;
  }
`;
