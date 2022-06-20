import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Title } from '../src/components/Layout/Title';
import { MovieInfo } from '../src/components/Movie';
import { BoardList } from '../src/components/User/Board/List';
import { Page } from '../styles/global';

const Home: NextPage = () => {
  return (
    <>
      <Title title="홈" />
      <Page>
        <MovieInfo type="trending" />
        <BoardList isAllBoards={true} />
      </Page>
    </>
  );
};
export default Home;
