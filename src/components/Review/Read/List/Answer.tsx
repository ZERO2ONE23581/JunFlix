import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { AnswerModal, DimBackground } from '../../../../../styles/global';

interface IAnswer {
  setAnswer: Dispatch<SetStateAction<boolean>>;
}
export const Answer = ({ setAnswer }: IAnswer) => {
  return (
    <>
      <Cont>
        <span>제목을 클릭하면 해당 리뷰로 이동합니다.</span>
        <span>Click the review title to see the review.</span>
      </Cont>
      <DimBackground zIndex={1} onClick={() => setAnswer(false)} />
    </>
  );
};
const Cont = styled(AnswerModal)``;
