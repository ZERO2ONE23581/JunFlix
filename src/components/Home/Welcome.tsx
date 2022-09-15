import { Texts } from './Texts';
import { useState } from 'react';
import styled from '@emotion/styled';
import { Btn } from '../Tools/Button';
import { useRouter } from 'next/router';
import useUser from '../../libs/client/useUser';
import { Answer } from '../Tools/Modal/Answer';

export const Welcome = () => {
  const { isLoggedIn, loggedInUser } = useUser();
  const router = useRouter();
  const [answer, setAnswer] = useState(false);
  return (
    <>
      <Cont>
        <Texts />
        <div className="btn-wrap">
          {isLoggedIn && (
            <Btn
              type="button"
              name="Home"
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
            name="Info"
            onClick={() => setAnswer(true)}
            svg={{
              size: '1.6rem',
              type: 'exclamation',
              location: { right: true },
            }}
          />
        </div>
      </Cont>
      {answer && <Answer type="home" closeModal={setAnswer} />}
    </>
  );
};
const Cont = styled.article`
  padding: 150px 80px 50px;
  .btn-wrap {
    gap: 20px;
    display: flex;
    align-items: center;
    margin-top: 40px;
    margin-left: 40px;
    button {
      width: 120px;
      padding: 8px;
      font-weight: 500;
      font-size: 1.2rem;
      color: black;
      background-color: white;
      svg {
        fill: black;
      }
      :hover {
        color: white;
        background-color: ${(p) => p.theme.color.logo};
        svg {
          fill: white;
        }
      }
    }
  }
`;
