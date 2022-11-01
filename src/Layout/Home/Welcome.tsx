import { Texts } from './Texts';
import { useState } from 'react';
import styled from '@emotion/styled';
import { Btn } from '../../Tools/Button';
import { useRouter } from 'next/router';
import { ITheme } from '../../../styles/theme';
import { BtnWrap } from '../../../styles/global';
import { useUser } from '../../libs/client/useUser';
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
    if (type === 'join') return router.push('/user/create');
    if (type === 'info') return setAnswer(true);
  };
  const dash = { theme, svg: 'home', type: 'button', name: 'My Page' };
  const info = { theme, name: 'Info', type: 'button', svg: 'exclamation' };
  const join = { theme, type: 'button', name: 'Join', svg: 'circle-arrow' };
  return (
    <>
      <Cont>
        <Texts />
        <BtnWrap className="btn-wrap">
          {isLoggedIn && (
            <Btn
              type="button"
              item={{ ...dash }}
              onClick={() => onClick('my-page')}
            />
          )}
          {!isLoggedIn && (
            <Btn
              type="button"
              item={{ ...join }}
              onClick={() => onClick('join')}
            />
          )}
          <Btn
            type="button"
            item={{ ...info }}
            onClick={() => onClick('info')}
          />
        </BtnWrap>
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
  padding: 10rem 5rem 2rem;
  .btn-wrap {
    gap: 20px;
    margin-top: 50px;
    font-size: 1.1rem;
    width: fit-content;
    button {
      gap: 10px;
      min-width: 140px;
    }
  }
`;
