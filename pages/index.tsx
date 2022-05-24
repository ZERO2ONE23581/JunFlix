import type { NextPage } from 'next';
import { MainComponent } from '../src/components/Home';
import { Title } from '../src/components/Layout/parts/Title';
import { MovieInfo } from '../src/components/Movie';

const Home: NextPage = () => {
  //
  return (
    <>
      <Title title="홈" />
      <MainComponent />
      <MovieInfo type="trending" />
    </>
  );
};
export default Home;
