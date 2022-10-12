import { Texts } from './Texts';
import { useState } from 'react';
import styled from '@emotion/styled';
import { Btn } from '../../Tools/Button';
import { useRouter } from 'next/router';
import useUser from '../../libs/client/useUser';
import { ITheme } from '../../../styles/theme';
import { Answer } from '../../Tools/Modal/answer_modal';

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
              type="button"
              isBoolean={{ theme }}
              onClick={() => onClick('dash')}
              isString={{ btnName: 'My Dash', svg: 'home' }}
            />
          )}
          {!isLoggedIn && (
            <Btn
              type="button"
              isBoolean={{ theme }}
              isString={{ btnName: 'Join', svg: 'circle-arrow' }}
              onClick={() => router.push('/user/create')}
            />
          )}
          <Btn
            type="button"
            isBoolean={{ theme }}
            onClick={() => setAnswer(true)}
            isString={{ btnName: 'Info', svg: 'exclamation' }}
          />
        </div>
      </Cont>
      <Answer
        type="home"
        theme={theme}
        answer={answer}
        closeModal={setAnswer}
      />
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
