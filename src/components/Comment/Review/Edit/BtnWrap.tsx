import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { IconBtn } from '../../../Tools/Button/Icon';

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
    setSelectId(ID);
    if (type === 'reply') setReply(true);
    if (type === 'edit') setEdit(true);
    if (type === 'delete') setDel(true);
    if (type === 'cancel') {
      setSelectId(0);
      setEdit(false);
      setReply(false);
      setDel(false);
    }
  };
  return (
    <Cont>
      <IconBtn
        type="button"
        size="1.3rem"
        svgType="reply"
        isDisable={Boolean(selectId)}
        onClick={() => handleClick(commentId, 'reply')}
      />
      <IconBtn
        type="button"
        size="1.3rem"
        svgType="close"
        isDisable={!Boolean(selectId)}
        onClick={() => handleClick(commentId, 'cancel')}
      />
      {isMyComment && (
        <>
          <IconBtn
            type="button"
            size="1.3rem"
            svgType="pen"
            isDisable={Boolean(selectId)}
            onClick={() => handleClick(commentId, 'edit')}
          />
          <IconBtn
            type="button"
            size="1.3rem"
            svgType="trash"
            isDisable={Boolean(selectId)}
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
