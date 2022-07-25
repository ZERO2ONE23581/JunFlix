import { useState } from 'react';
import { Answer } from './Modal/Answer';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { IconBtn } from '../../../Style/Button/IconBtn';

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
  right: -80px;
  bottom: 200px;
  position: absolute;
  gap: 2rem;
  display: flex;
  flex-direction: column;
`;
