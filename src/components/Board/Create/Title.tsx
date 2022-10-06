import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { Answer } from '../../../Tools/Modal/Answer';
import { Svg } from '../../../Tools/Svg';

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
        <Svg size="2rem" type="question" onClick={() => setAnswer(true)} />
      </Cont>
      {answer && (
        <Answer
          type="create-board"
          closeModal={setAnswer}
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
