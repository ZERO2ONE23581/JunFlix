import { useState } from 'react';
import { Answer } from '../Answer';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { IconBtn } from '../../../../Style/Button/IconBtn';

export const FixedBtn = () => {
  const router = useRouter();
  const [answer, setAnwser] = useState(false);
  return (
    <>
      <Cont>
        <IconBtn
          size="3rem"
          type="button"
          svgType="compass"
          onClick={() => router.push(`/user/all/boards`)}
        />
        <IconBtn
          size="3rem"
          type="button"
          svgType="question"
          onClick={() => setAnwser((p) => !p)}
        />
      </Cont>
      {answer && <Answer openModal={setAnwser} />}
    </>
  );
};
const Cont = styled.div`
  top: 500px;
  right: -8%;
  position: absolute;
  gap: 2rem;
  display: flex;
  flex-direction: column;
`;
