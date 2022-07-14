import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { IconBtn } from '../../../Style/Button/IconBtn';

interface IBtnWrap {
  selectId: number;
  commentId: number;
  isMyComment: boolean;
  setSelectId: Dispatch<SetStateAction<number>>;
  setEditCmt: Dispatch<SetStateAction<boolean>>;
  setReplyCmt: Dispatch<SetStateAction<boolean>>;
  setDeleteCmt: Dispatch<SetStateAction<boolean>>;
}
export const BtnWrap = ({
  selectId,
  commentId,
  isMyComment,
  setSelectId,
  setEditCmt,
  setReplyCmt,
  setDeleteCmt,
}: IBtnWrap) => {
  const handleClick = (ID: number, type: string) => {
    setSelectId(ID);
    if (type === 'reply') setReplyCmt(true);
    if (type === 'edit') setEditCmt(true);
    if (type === 'delete') setDeleteCmt(true);
    if (type === 'cancel') {
      setSelectId(0);
      setEditCmt(false);
      setReplyCmt(false);
      setDeleteCmt(false);
    }
  };
  return (
    <Cont>
      <IconBtn
        size="1rem"
        type="button"
        svgType="reply"
        disabled={selectId !== 0}
        onClick={() => handleClick(commentId, 'reply')}
      />
      <IconBtn
        size="1rem"
        type="button"
        svgType="close"
        disabled={selectId === 0}
        onClick={() => handleClick(commentId, 'cancel')}
      />
      {isMyComment && (
        <>
          <IconBtn
            size="1rem"
            svgType="pen"
            type="button"
            disabled={selectId !== 0}
            onClick={() => handleClick(commentId, 'edit')}
          />
          <IconBtn
            size="1rem"
            type="button"
            svgType="trash"
            disabled={selectId !== 0}
            onClick={() => handleClick(commentId, 'delete')}
          />
        </>
      )}
    </Cont>
  );
};
const Cont = styled.article`
  top: 0;
  right: 20px;
  position: absolute;
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: end;
  margin-bottom: 5px;
  button {
    :disabled {
      cursor: default;
      opacity: 0.4;
      svg {
        :hover {
          fill: ${(p) => p.theme.color.font};
        }
      }
    }
  }
`;
