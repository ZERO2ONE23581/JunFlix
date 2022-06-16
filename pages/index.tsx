import type { NextPage } from 'next';
import { Title } from '../src/components/Layout/Title';
import { MovieInfo } from '../src/components/Movie';
import { BoardList } from '../src/components/User/Board/BoardList';

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
