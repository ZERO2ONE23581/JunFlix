import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../../Style/Button';
import { Dispatch, SetStateAction, useState } from 'react';
import useUser from '../../../../libs/client/useUser';

interface IBoardBtnWrap {
  onEdit: Dispatch<SetStateAction<boolean>>;
  onCreate: Dispatch<SetStateAction<boolean>>;
  onDelete: Dispatch<SetStateAction<boolean>>;
}
export const BtnWrap = ({ onEdit, onDelete, onCreate }: IBoardBtnWrap) => {
  return (
    <Cont>
      <Btn name="보드수정" type="button" onClick={() => onEdit(true)} />
      <Btn name="보드삭제" type="button" onClick={() => onDelete(true)} />
      <Btn name="게시물 작성" type="button" onClick={() => onCreate(true)} />
    </Cont>
  );
};
const Cont = styled.article`
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
