import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { AnswerModal, Page } from '../styles/global';
import { Movie } from '../src/components/Home/Movie';
import { Board } from '../src/components/Home/Board';
import { HeadTitle } from '../src/components/Title/Head';
import { Intro } from '../src/components/Home/Intro';
import { Btn } from '../src/components/Style/Button';
import useUser from '../src/libs/client/useUser';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BtnWrap } from '../src/components/Home/BtnWrap';

const Home: NextPage = () => {
  const { isLoggedIn } = useUser();
  const router = useRouter();
  const [answer, setAnswer] = useState(false);
  return (
    <>
      <HeadTitle title="HOME" />
      <Main>
        <div className="wrap">
          <Intro />
          <BtnWrap />
        </div>
        <Movie type="trending" />
      </Main>
      <Cont>
        <Board />
      </Cont>
    </>
  );
};
export default Home;

const Cont = styled(Page)``;
const Main = styled(Page)`
  padding: 0 3% 5%;
  width: 100vw;
  min-height: 100vh;
  color: whitesmoke;
  background: url('/img/1.jpeg') center / cover no-repeat;
  .wrap {
    padding: 30px 50px;
    margin: 100px auto 80px;
  }
`;
