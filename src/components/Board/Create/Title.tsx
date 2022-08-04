import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { IconBtn } from '../../Tools/Button/Icon';
import { Answer } from '../../Tools/Modal/Answer';

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
