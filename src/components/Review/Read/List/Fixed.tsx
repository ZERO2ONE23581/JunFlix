import { useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { IconBtn } from '../../../Tools/Button/Icon';
import useUser from '../../../../libs/client/useUser';
import { Answer } from '../../../Tools/Modal/Answer';

export const Fixed = () => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const [answer, setAnswer] = useState(false);
  return (
    <>
      <Cont>
        <IconBtn
          size="2.8rem"
          type="button"
          svgType="add"
          onClick={() => router.push(`/user/${loggedInUser?.id}/review/create`)}
        />
        <IconBtn
          size="2.8rem"
          type="button"
          svgType="question"
          onClick={() => setAnswer(true)}
        />
      </Cont>
      {answer && <Answer type="read-review" closeModal={setAnswer} />}
    </>
  );
};
const Cont = styled.div`
  bottom: 150px;
  right: 50px;
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
