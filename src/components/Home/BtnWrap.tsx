import { useState } from 'react';
import styled from '@emotion/styled';
import { Btn } from '../Tools/Button';
import { useRouter } from 'next/router';
import { Answer } from '../Tools/Modal/Answer';
import useUser from '../../libs/client/useUser';

export const BtnWrap = () => {
  const { isLoggedIn } = useUser();
  const router = useRouter();
  const [answer, setAnswer] = useState(false);
  return (
    <>
      <Cont>
        {isLoggedIn && (
          <Btn
            size="1.6rem"
            type="button"
            name="Dashboard"
            svg="circle-arrow"
            onClick={() => router.push('/my/page')}
          />
        )}
        {!isLoggedIn && (
          <Btn
            name="Start"
            type="button"
            size="1.6rem"
            svg="circle-arrow"
            onClick={() => router.push('/join')}
          />
        )}
        <Btn
          size="1.6rem"
          type="button"
          name="More Info"
          svg="exclamation"
          onClick={() => setAnswer(true)}
        />
      </Cont>
      {answer && <Answer type="home" closeModal={setAnswer} />}
    </>
  );
};

const Cont = styled.div`
  gap: 20px;
  display: flex;
  align-items: center;
  margin: 50px 0 100px;
  justify-content: flex-start;
  padding: 10px;
  button {
    width: 160px;
    height: 45px;
    font-weight: 500;
    font-size: 1.3rem;
    svg {
      fill: ${(p) => p.theme.color.bg};
    }
  }
`;
