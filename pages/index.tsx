import type { NextPage } from 'next';
import { MainComponent } from '../src/components/Home';
import { Title } from '../src/components/Layout/parts/Title';

const Home: NextPage = () => {
  //
  return (
    <>
      <Title title="홈" />
      <MainComponent />
    </>
  );
};
export default Home;
