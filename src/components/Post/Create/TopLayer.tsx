import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { IconBtn } from '../../Style/Button/IconBtn';

interface IBtnWrapProps {
  next: boolean;
  setNext: Dispatch<SetStateAction<boolean>>;
  undoPost: boolean;
  setUndoPost: Dispatch<SetStateAction<boolean>>;
}
export const TopLayer = ({
  next,
  setNext,
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
            svgType="left-arrow"
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
          <div />
        </Cont>
      )}
    </>
  );
};
const Cont = styled.div`
  width: 100%;
  height: 6vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: ${(p) => p.theme.border.thin};
  h1 {
    font-size: 1.1rem;
  }
  svg {
    width: 1.3em;
    height: 1.3em;
  }
  button {
    padding: 5px;
    font-size: 1rem;
  }
`;
