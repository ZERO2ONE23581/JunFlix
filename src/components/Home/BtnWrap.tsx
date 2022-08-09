import { useState } from 'react';
import styled from '@emotion/styled';
import { Btn } from '../Tools/Button';
import { useRouter } from 'next/router';
import { Answer } from '../Tools/Modal/Answer';
import useUser from '../../libs/client/useUser';

export const BtnWrap = () => {
  const { isLoggedIn, loggedInUser } = useUser();
  const router = useRouter();
  const [answer, setAnswer] = useState(false);
  return (
    <>
      <Cont>
        {isLoggedIn && (
          <Btn
            type="button"
            name="Dashboard"
            onClick={() =>
              router.push(
                `/user/${loggedInUser?.id}/${loggedInUser?.username}/dashboard`
              )
            }
            svg={{
              size: '1.6rem',
              type: 'home',
              location: { right: true },
            }}
          />
        )}
        {!isLoggedIn && (
          <Btn
            name="Start"
            type="button"
            onClick={() => router.push('/join')}
            svg={{
              size: '1.6rem',
              type: 'circle-arrow',
              location: { right: true },
            }}
          />
        )}
        <Btn
          type="button"
          name="More Info"
          onClick={() => setAnswer(true)}
          svg={{
            size: '1.6rem',
            type: 'exclamation',
            location: { right: true },
          }}
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
    padding: 10px;
    font-weight: 400;
    font-size: 1.2rem;
    color: ${(p) => p.theme.color.font};
    background-color: ${(p) => p.theme.color.bg};
  }
`;
