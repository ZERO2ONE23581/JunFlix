import { Texts } from './Texts';
import { useState } from 'react';
import styled from '@emotion/styled';
import { Btn } from '../../Tools/Button';
import { useRouter } from 'next/router';
import useUser from '../../libs/client/useUser';
import { ITheme } from '../../../styles/theme';
import { Answer } from '../../Tools/Modal/answer_modal';
import { BtnWrap } from '../../../styles/global';

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
  padding: 10% 5% 3%;
  .btn-wrap {
    gap: 20px;
    font-size: 1.1em;
    width: fit-content;
    button {
      gap: 5px;
      width: 100px;
    }
  }
`;
