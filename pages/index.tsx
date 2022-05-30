import type { NextPage } from 'next';
import { AllBoards } from '../src/components/Board/AllBoards';
import { Title } from '../src/components/Layout/Title';
import { MovieInfo } from '../src/components/Movie';

const Home: NextPage = () => {
  return (
    <>
      <Title title="홈" />
      <MovieInfo type="trending" />
      <AllBoards />
    </>
  );
};
export default Home;
