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
    <Cont className="edit-comment-btns">
      <IconBtn
        svgType="reply"
        type="button"
        disabled={selectId !== 0}
        onClick={() => handleClick(commentId, 'reply')}
      />
      <IconBtn
        svgType="close"
        type="button"
        disabled={selectId === 0}
        onClick={() => handleClick(commentId, 'cancel')}
      />
      {isMyComment && (
        <>
          <IconBtn
            svgType="pen"
            type="button"
            disabled={selectId !== 0}
            onClick={() => handleClick(commentId, 'edit')}
          />
          <IconBtn
            svgType="trash"
            type="button"
            disabled={selectId !== 0}
            onClick={() => handleClick(commentId, 'delete')}
          />
        </>
      )}
    </Cont>
  );
};
const Cont = styled.article`
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: end;
  margin-bottom: 5px;
  svg {
    :hover {
      fill: ${(p) => p.theme.color.logo};
    }
  }
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
