import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { AllBoards } from '../src/components/Board/AllBoards';
import { Title } from '../src/components/Layout/parts/Title';
import { MovieInfo } from '../src/components/Movie';

const Home: NextPage = () => {
  //
  return (
    <Cont>
      <Title title="홈" />
      <MovieInfo type="trending" />
      <AllBoards />
    </Cont>
  );
};
export default Home;
const Cont = styled.section``;
