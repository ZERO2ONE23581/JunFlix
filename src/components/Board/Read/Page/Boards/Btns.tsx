import { useState } from 'react';
import { Answer } from './Answer';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import useUser from '../../../../../libs/client/useUser';
import { IconBtn } from '../../../../Style/Button/IconBtn';

export const BoardsPgBtns = () => {
  const router = useRouter();
  const [answer, setAnswer] = useState(false);
  const { isLoggedIn, loggedInUser } = useUser();
  return (
    <Cont>
      <IconBtn
        type="button"
        svgType="question"
        onClick={() => setAnswer(true)}
      />
      {isLoggedIn && (
        <IconBtn
          type="button"
          svgType="add"
          onClick={() => router.push(`/user/${loggedInUser?.id}/board/create`)}
        />
      )}
      {answer && <Answer openModal={setAnswer} />}
    </Cont>
  );
};
const Cont = styled.article`
  right: 3%;
  bottom: 10%;
  position: fixed;
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  svg {
    width: 40px;
    height: 40px;
  }
`;
