import styled from '@emotion/styled';
import { Btn } from '../../../Style/Button';
import { Dispatch, SetStateAction } from 'react';
import { IconBtn } from '../../../Style/Button/IconBtn';

interface ISettingBtnProps {
  setting: boolean;
  onEdit: Dispatch<SetStateAction<boolean>>;
  onDelete: Dispatch<SetStateAction<boolean>>;
  onCreate: Dispatch<SetStateAction<boolean>>;
  openSetting: Dispatch<SetStateAction<boolean>>;
}

export const SettingBtn = ({
  onEdit,
  onDelete,
  onCreate,
  setting,
  openSetting,
}: ISettingBtnProps) => {
  const clickCreatePost = () => {
    onCreate(true);
    openSetting(false);
  };
  return (
    <>
      <Cont>
        <IconBtn
          isClicked={setting}
          svgType="setting"
          onClick={() => openSetting((p) => !p)}
        />
        {setting && (
          <BtnWrap>
            <Btn name="보드수정" type="button" onClick={() => onEdit(true)} />
            <Btn name="보드삭제" type="button" onClick={() => onDelete(true)} />
            <Btn type="button" name="게시물 작성" onClick={clickCreatePost} />
          </BtnWrap>
        )}
      </Cont>
    </>
  );
};
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
  border: 3px solid pink;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    width: 100%;
    border-radius: 0%;
  }
`;
