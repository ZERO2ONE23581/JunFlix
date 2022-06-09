import type { NextPage } from 'next';
import { BoardList } from '../src/components/Board/BoardList';
import { Title } from '../src/components/Layout/Title';
import { MovieInfo } from '../src/components/Movie';

const Home: NextPage = () => {
  return (
    <>
      <Title title="홈" />
      <MovieInfo type="trending" />
      <BoardList isAllBoards={true} />
    </>
  );
};
export default Home;
