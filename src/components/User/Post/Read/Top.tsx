import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { IconBtn } from '../../../Style/Button/IconBtn';

interface IBtnWrapProps {
  next: boolean;
  setNext: Dispatch<SetStateAction<boolean>>;
  onSubmit: boolean;
  setOnSubmit: Dispatch<SetStateAction<boolean>>;
  undoPost: boolean;
  setUndoPost: Dispatch<SetStateAction<boolean>>;
}
export const Top = ({
  next,
  setNext,
  onSubmit,
  setOnSubmit,
  undoPost,
  setUndoPost,
}: IBtnWrapProps) => {
  return (
    <>
      {!next && (
        <Cont>
          <IconBtn
            type="button"
            isClicked={undoPost}
            svgType="undo-arrow"
            onClick={() => setUndoPost(true)}
          />
          <h1>새 게시물 만들기</h1>
          <IconBtn
            type="button"
            svgType="right-arrow"
            onClick={() => setNext(true)}
          />
        </Cont>
      )}
      {next && (
        <Cont>
          <IconBtn
            type="button"
            svgType="left-arrow"
            onClick={() => setNext(false)}
          />
          <h1>새 게시물 만들기</h1>
          <IconBtn
            type="button"
            isClicked={onSubmit}
            svgType="submit-arrow"
            onClick={() => setOnSubmit(true)}
          />
        </Cont>
      )}
    </>
  );
};
const Cont = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${(p) => p.theme.border.thin};
  h1 {
    font-size: 1.2rem;
  }
`;
