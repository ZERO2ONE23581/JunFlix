import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Title } from '../src/components/Layout/parts/Title';
import { Container } from '../styles/global';

const Home: NextPage = () => {
  //
  return (
    <>
      <Title title="홈" />
      <Container>
        <H1>Home</H1>
        <H1>Home</H1>
      </Container>
    </>
  );
};
export default Home;
const H1 = styled.h1`
  border: 2px solid blue;
`;
