import styled from '@emotion/styled';
import { Btn } from '../../Style/Button';
import { Dispatch, SetStateAction, useState } from 'react';
import { IconBtn } from '../../Style/Button/IconBtn';
import { ModalClose } from '../../../../styles/global';

interface ISettingBtnProps {
  setEditPost: Dispatch<SetStateAction<boolean>>;
  setDeletePost: Dispatch<SetStateAction<boolean>>;
}

export const PostSetting = ({
  setEditPost,
  setDeletePost,
}: ISettingBtnProps) => {
  const [onSetting, setOnSetting] = useState(false);
  const handleClick = (type: string) => {
    setOnSetting(false);
    if (type === 'edit') return setEditPost(true);
    if (type === 'delete') return setDeletePost(true);
  };
  return (
    <>
      <Cont>
        <IconBtn
          type="button"
          svgType="setting"
          isClicked={onSetting}
          onClick={() => setOnSetting((p) => !p)}
        />
        {onSetting && (
          <BtnWrap>
            <Btn
              type="button"
              name="포스트 수정"
              onClick={() => handleClick('edit')}
            />
            <Btn
              type="button"
              name="포스트 삭제"
              onClick={() => handleClick('delete')}
            />
          </BtnWrap>
        )}
      </Cont>
      {onSetting && <ModalClose onClick={() => setOnSetting((p) => !p)} />}
    </>
  );
};
const Cont = styled.div`
  position: relative;
  svg {
    fill: ${(p) => p.theme.color.font};
  }
`;
const BtnWrap = styled.article`
  z-index: 999;
  width: 300%;
  top: 100%;
  right: -100%;
  position: absolute;
  border: none;
  display: flex;
  overflow: hidden;
  border-radius: 3px;
  align-items: center;
  flex-direction: column;
  button {
    width: 100%;
    border-radius: 0%;
  }
`;
