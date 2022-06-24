import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { IconBtn } from '../../Style/Button/IconBtn';

interface IBtnWrapProps {
  next: boolean;
  submit: boolean;
  undoPost: boolean;
  setNext: Dispatch<SetStateAction<boolean>>;
  setSubmit: Dispatch<SetStateAction<boolean>>;
  setUndoPost: Dispatch<SetStateAction<boolean>>;
}
export const TitleWithBtn = ({
  next,
  submit,
  undoPost,
  setNext,
  setSubmit,
  setUndoPost,
}: IBtnWrapProps) => {
  return (
    <>
      {!next && (
        <FirstStep>
          <IconBtn
            isClicked={undoPost}
            svgType="undo-arrow"
            onClick={() => setUndoPost(true)}
          />
          <h1>새 게시물 만들기 Step 1</h1>
          <IconBtn svgType="right-arrow" onClick={() => setNext(true)} />
        </FirstStep>
      )}
      {next && (
        <FirstStep>
          <IconBtn svgType="left-arrow" onClick={() => setNext(false)} />
          <h1>새 게시물 만들기 Step 2</h1>
          <IconBtn
            isClicked={submit}
            svgType="submit-arrow"
            onClick={() => setSubmit(true)}
          />
        </FirstStep>
      )}
    </>
  );
};
const FirstStep = styled.div`
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${(p) => p.theme.border.thin};
  h1 {
    font-size: 1.2rem;
  }
`;
