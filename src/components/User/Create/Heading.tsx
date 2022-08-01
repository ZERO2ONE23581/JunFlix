import styled from '@emotion/styled';
import { useState } from 'react';
import { IconBtn } from '../../Tools/Button/IconBtn';
import { Svg } from '../../Tools/Svg';
import { Answer } from '../../Tools/Modal/user_qna';

interface IHeading {
  h1?: string;
  h2?: string;
  type: string;
}
export const Heading = ({ h1, h2, type }: IHeading) => {
  const [answer, setAnswer] = useState(false);
  return (
    <Cont className="heading">
      <div className="flex">
        {type === 'delete-acct' && (
          <Svg type="danger" size="1.4rem" fill="red" />
        )}
        <H1>{h1}</H1>
        <IconBtn
          type="button"
          size="1.8rem"
          svgType="question"
          onClick={() => setAnswer(true)}
        />
      </div>
      {h2 && <H2>{h2}</H2>}
      {answer && <Answer type={type} setAnswer={setAnswer} />}
    </Cont>
  );
};
const Cont = styled.div`
  .flex {
    gap: 20px;
    display: flex;
    align-items: center;
  }
`;
const H1 = styled.h1`
  font-weight: 500;
  font-size: 1.6rem;
`;
const H2 = styled.h1`
  opacity: 0.9;
  font-size: 1.3rem;
  font-style: italic;
`;
