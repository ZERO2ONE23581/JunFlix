import styled from '@emotion/styled';
import { Btn } from '../../Style/Button';
import { Dispatch, SetStateAction } from 'react';

interface IBoardBtnWrap {
  setOnEdit: Dispatch<SetStateAction<boolean>>;
  setOnDelete: Dispatch<SetStateAction<boolean>>;
  setOnCreate: Dispatch<SetStateAction<boolean>>;
  setOnSetting: Dispatch<SetStateAction<boolean>>;
}
export const BtnWrap = ({
  setOnEdit,
  setOnDelete,
  setOnCreate,
  setOnSetting,
}: IBoardBtnWrap) => {
  const hadleClick = (type: string) => {
    setOnSetting(false);
    if (type === 'edit') setOnEdit(true);
    if (type === 'delete') setOnDelete(true);
    if (type === 'create') setOnCreate(true);
  };
  return (
    <>
      <Cont>
        <Btn name="보드수정" type="button" onClick={() => hadleClick('edit')} />
        <Btn
          name="보드삭제"
          type="button"
          onClick={() => hadleClick('delete')}
        />
        <Btn
          name="게시물 작성"
          type="button"
          onClick={() => hadleClick('create')}
        />
      </Cont>
    </>
  );
};
const Cont = styled.article`
  z-index: 201;
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
    border-bottom: 1px solid ${(p) => p.theme.color.bg};
  }
`;
