import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Title } from '../src/components/Layout/parts/Title';
import { PageContainer } from '../styles/defaultStyle';

const Home: NextPage = () => {
  //
  return (
    <>
      <Title title="홈" />
      <PageContainer>
        <H1>Home</H1>
        <H1>Home</H1>
      </PageContainer>
    </>
  );
};
export default Home;
const H1 = styled.h1`
  border: 2px solid blue;
`;
