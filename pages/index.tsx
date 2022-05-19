import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Btn } from '../src/components/Btn';
import { Title } from '../src/components/Layout/parts/Title';
import { PageContainer } from '../styles/components/default';

const Home: NextPage = () => {
  //
  return (
    <>
      <Title title="홈" />
      <PageContainer>
        <H1>movie api will be displayed here</H1>
        <H1>Blogs will be displayed here</H1>
        <Btn type="create" btnName="Create Clapper" />
      </PageContainer>
    </>
  );
};
export default Home;
const H1 = styled.h1`
  border: 2px solid blue;
`;
