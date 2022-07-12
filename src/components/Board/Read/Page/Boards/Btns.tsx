import { useState } from 'react';
import { Answer } from './Answer';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import useUser from '../../../../../libs/client/useUser';
import { IconBtn } from '../../../../Style/Button/IconBtn';

export const PageBtns = () => {
  const router = useRouter();
  const [answer, setAnswer] = useState(false);
  const { isLoggedIn, loggedInUser } = useUser();
  return (
    <Cont>
      <IconBtn
        size="3rem"
        type="button"
        svgType="question"
        onClick={() => setAnswer(true)}
      />
      {isLoggedIn && (
        <IconBtn
          size="3rem"
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
`;
