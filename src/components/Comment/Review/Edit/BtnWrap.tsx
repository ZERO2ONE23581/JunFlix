import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { Svg } from '../../../../Tools/Svg';

interface IBtnWrap {
  selectId: number;
  commentId: number;
  isMyComment: boolean;
  setSelectId: Dispatch<SetStateAction<number>>;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setReply: Dispatch<SetStateAction<boolean>>;
  setDel: Dispatch<SetStateAction<boolean>>;
}
export const BtnWrap = ({
  selectId,
  commentId,
  isMyComment,
  setSelectId,
  setEdit,
  setReply,
  setDel,
}: IBtnWrap) => {
  const handleClick = (ID: number, type: string) => {
    const isDisable = Boolean(selectId);
    setSelectId(ID);
    if (type === 'reply') {
      if (isDisable) return;
      setReply(true);
    }
    if (type === 'edit') {
      if (isDisable) return;
      setEdit(true);
    }
    if (type === 'delete') {
      if (isDisable) return;
      setDel(true);
    }
    if (type === 'cancel') {
      if (!isDisable) return;
      setSelectId(0);
      setEdit(false);
      setReply(false);
      setDel(false);
    }
  };
  return (
    <Cont>
      <Svg
        size="1.3rem"
        type="reply"
        onClick={() => handleClick(commentId, 'reply')}
      />
      <Svg
        size="1.3rem"
        type="close"
        onClick={() => handleClick(commentId, 'cancel')}
      />
      {isMyComment && (
        <>
          <Svg
            size="1.3rem"
            type="pen"
            onClick={() => handleClick(commentId, 'edit')}
          />
          <Svg
            size="1.3rem"
            type="trash"
            onClick={() => handleClick(commentId, 'delete')}
          />
        </>
      )}
    </Cont>
  );
};
const Cont = styled.article`
  gap: 12px;
  display: flex;
  align-items: center;
  justify-content: end;
  margin-bottom: 5px;
`;
