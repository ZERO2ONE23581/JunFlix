import { Answer } from '../../Modal/Board/CreateBoardQnA';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { IconBtn } from '../../Style/Button/IconBtn';

interface ITitle {
  answer: boolean;
  maxTitle: number;
  maxIntro: number;
  setAnswer: Dispatch<SetStateAction<boolean>>;
}
export const Title = ({ answer, maxIntro, maxTitle, setAnswer }: ITitle) => {
  return (
    <>
      <Cont>
        <span>Create Board</span>
        <IconBtn
          size="2rem"
          type="button"
          svgType="question"
          onClick={() => setAnswer(true)}
        />
      </Cont>
      {answer && (
        <Answer
          openModal={setAnswer}
          max={{ title: maxTitle, intro: maxIntro }}
        />
      )}
    </>
  );
};
const Cont = styled.h1`
  max-width: 220px;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
