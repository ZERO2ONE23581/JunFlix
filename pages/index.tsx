import type { NextPage } from 'next';
import { Main } from '../src/components/Home/Main';
import { Boards } from '../src/components/Home/Boards';
import { HeadTitle } from '../src/components/Layout/Head';

const Home: NextPage = () => {
  return (
    <>
      <HeadTitle title="HOME" />
      <Main />
      <Boards />
    </>
  );
};
export default Home;
