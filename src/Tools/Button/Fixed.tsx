import { useState } from 'react';
import { Answer } from '../Modal/answer';
import styled from '@emotion/styled';
import useUser from '../../libs/client/useUser';
import { Move } from '../Modal/Move';
import { Svg } from '../Svg';

interface IFixed {
  type: string;
}
export const Fixed = ({ type }: IFixed) => {
  const [answer, setAnswer] = useState(false);
  const [modal, setModal] = useState(false);
  const { isLoggedIn } = useUser();
  return (
    <>
      <Cont>
        <Svg size="2.5rem" type="question" onClick={() => setAnswer(true)} />
        {isLoggedIn && type !== 'update-review' && (
          <Svg size="2.5rem" type="add" onClick={() => setModal(true)} />
        )}
      </Cont>
      {answer && <Answer type={type} closeModal={setAnswer} />}
      {modal && <Move type={type} closeModal={setModal} />}
    </>
  );
};
const Cont = styled.article`
  right: 2rem;
  bottom: 2rem;
  position: fixed;
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
