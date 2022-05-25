import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { MovieInfo } from '../src/components/Movie';
import { AllBoards } from '../src/components/Home/AllBoards';
import { Title } from '../src/components/Layout/parts/Title';

const Home: NextPage = () => {
  //
  return (
    <Cont>
      <Title title="홈" />
      <h2>WELCOME TO JUNFLIX!</h2>
      <MovieInfo type="trending" />
      <AllBoards />
    </Cont>
  );
};
export default Home;
const Cont = styled.section`
  padding: 15px 100px;
  h2 {
    margin: 10px auto;
    font-style: italic;
    font-size: 2rem;
    font-weight: bold;
    color: ${(p) => p.theme.color.logo};
  }
`;
