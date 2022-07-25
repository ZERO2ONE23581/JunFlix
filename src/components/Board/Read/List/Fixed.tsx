import { useState } from 'react';
import { Answer } from './Modal/Answer';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import useUser from '../../../../libs/client/useUser';
import { IconBtn } from '../../../Style/Button/IconBtn';

export const FixedBtn = () => {
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
  top: 400px;
  right: -8%;
  position: absolute;
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
