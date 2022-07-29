import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { AnswerModal, Page } from '../../../styles/global';
import { Movie } from './Movie';
import { Board } from './Board';
import { HeadTitle } from '../Title/Head';
import { Intro } from './Intro';
import { Btn } from '../Style/Button';
import useUser from '../../libs/client/useUser';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Answer } from './Answer';

export const BtnWrap = () => {
  const { isLoggedIn } = useUser();
  const router = useRouter();
  const [answer, setAnswer] = useState(false);
  return (
    <>
      <Cont>
        {isLoggedIn && (
          <Btn
            type="button"
            svg="circle-arrow"
            name="Dashboard"
            onClick={() => {
              router.push('/user/mypage');
            }}
          />
        )}
        {!isLoggedIn && (
          <Btn
            name="Start"
            type="button"
            svg="circle-arrow"
            onClick={() => {}}
          />
        )}
        <Btn
          type="button"
          name="More Info"
          svg="exclamation"
          onClick={() => setAnswer(true)}
        />
      </Cont>
      {answer && <Answer setAnswer={setAnswer} />}
    </>
  );
};

const Cont = styled.div`
  margin-top: 20px;
  gap: 15px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  button {
    width: 150px;
    height: 40px;
    font-size: 1.2rem;
  }
`;
