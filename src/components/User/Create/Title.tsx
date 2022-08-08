import styled from '@emotion/styled';
import { useState } from 'react';
import { IconBtn } from '../../Tools/Button/Icon';
import { Answer } from '../../Tools/Modal/Answer';

interface ITitle {
  type: string;
  eng?: string;
  kor?: string;
}
export const Title = ({ type, eng, kor }: ITitle) => {
  const [answer, setAnswer] = useState(false);
  return (
    <>
      {answer && <Answer type={type} closeModal={setAnswer} />}
      <Cont>
        {eng && <span className="eng">{eng}</span>}
        {kor && <span className="kor">{kor}</span>}
        <IconBtn
          type="button"
          size="1.7rem"
          svgType="question"
          onClick={() => setAnswer(true)}
        />
      </Cont>
    </>
  );
};
const Cont = styled.h1`
  gap: 15px;
  display: flex;
  align-items: center;
  .eng {
    font-size: 1.5rem;
  }
  .kor {
    margin-top: 3px;
    font-size: 1.2rem;
  }
  .question {
    margin-top: 2px;
  }
`;
