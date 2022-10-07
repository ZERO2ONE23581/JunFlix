import { Texts } from './Texts';
import { useState } from 'react';
import styled from '@emotion/styled';
import { Btn } from '../../Tools/Button';
import { useRouter } from 'next/router';
import useUser from '../../libs/client/useUser';
import { Answer } from '../../Tools/Modal/Answer';
import { ITheme } from '../../../styles/theme';

export const Welcome = ({ theme }: ITheme) => {
  const { isLoggedIn, loggedInUser } = useUser();
  const router = useRouter();
  const [answer, setAnswer] = useState(false);
  const onClick = (type: string) => {
    if (type === 'dash')
      return router.push(
        `/user/${loggedInUser?.id}/${loggedInUser?.username}/dashboard`
      );
  };
  return (
    <>
      <Cont>
        <Texts />
        <div className="btn-wrap">
          {isLoggedIn && (
            <Btn
              theme={theme}
              svg="home"
              type="button"
              name="My Dash"
              onClick={() => onClick('dash')}
            />
          )}
          {!isLoggedIn && (
            <Btn
              theme={theme}
              name="Join"
              type="button"
              svg="circle-arrow"
              onClick={() => router.push('/user/join')}
            />
          )}
          <Btn
            theme={theme}
            name="Info"
            type="button"
            svg="exclamation"
            onClick={() => setAnswer(true)}
          />
        </div>
      </Cont>
      {answer && <Answer theme={theme} type="home" closeModal={setAnswer} />}
    </>
  );
};
const Cont = styled.article`
  padding: 10% 5% 3%;
  .btn-wrap {
    gap: 20px;
    display: flex;
    align-items: center;
    font-size: 1.1em;
    margin: 2em 0;
    width: fit-content;
    button {
      gap: 0.5em;
      width: 7em;
    }
  }
`;
