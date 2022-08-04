import { useState } from 'react';
import { Answer } from '../Modal/Answer';
import styled from '@emotion/styled';
import useUser from '../../../libs/client/useUser';
import { IconBtn } from './Icon';
import { Move } from '../Modal/Move';

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
        <IconBtn
          size="2.5rem"
          type="button"
          svgType="question"
          onClick={() => setAnswer(true)}
        />
        {isLoggedIn && (
          <IconBtn
            size="2.5rem"
            type="button"
            svgType="add"
            onClick={() => setModal(true)}
          />
        )}
      </Cont>
      {answer && <Answer type={type} closeModal={setAnswer} />}
      {modal && <Move type={type} closeModal={setModal} />}
    </>
  );
};
const Cont = styled.article`
  right: 1%;
  bottom: 20%;
  position: fixed;
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
