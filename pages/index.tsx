import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Layout } from '../src/components/Layout';

const Home: NextPage = () => {
  //
  return (
    <>
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
