import type { NextPage } from 'next';
import { Page } from '../styles/global';
import { MovieInfo } from '../src/components/Movie';
import { Title } from '../src/components/Layout/Title';
import { BoardList } from '../src/components/User/Board/Read/List/BoardList';

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
