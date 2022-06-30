import styled from '@emotion/styled';
import { Btn } from '../../Style/Button';
import { Dispatch, SetStateAction, useState } from 'react';
import { IconBtn } from '../../Style/Button/IconBtn';
import { DimBackground, Modal } from '../../../../styles/global';

interface ISettingBtnProps {
  setEditPost: Dispatch<SetStateAction<boolean>>;
  setDeletePost: Dispatch<SetStateAction<boolean>>;
}

export const Setting = ({ setEditPost, setDeletePost }: ISettingBtnProps) => {
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
              CLASSNAME="delete-post-btn"
              onClick={() => handleClick('delete')}
            />
          </BtnWrap>
        )}
      </Cont>
      {onSetting && (
        <DimBackground zIndex={99} onClick={() => setOnSetting((p) => !p)} />
      )}
    </>
  );
};
const Cont = styled.div`
  svg {
    width: 2em;
    height: 2em;
    fill: ${(p) => p.theme.color.font};
  }
`;
const BtnWrap = styled(Modal)`
  width: 40vw;
  gap: 0;
  padding: 0;
  border: none;
  overflow: hidden;
  border-radius: 3px;
  button {
    width: 100%;
    border-radius: 0%;
    border-bottom: 1px solid ${(p) => p.theme.color.bg};
  }
  .delete-post-btn {
    button {
      border-bottom: none;
    }
  }
`;
