import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Layout } from '../src/components/Layout';
import { Title } from '../src/components/Layout/parts/Title';

const Home: NextPage = () => {
  //
  return (
    <>
      <Title title="홈" />
      <Cont>
        <h1>Home</h1>
      </Cont>
    </>
  );
};

export default Home;

const Cont = styled.section`
  height: 95vh;
  background-color: whitesmoke;
`;
