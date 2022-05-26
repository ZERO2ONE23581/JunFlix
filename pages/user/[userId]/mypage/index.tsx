import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Title } from '../../../../src/components/Layout/parts/Title';
import { H1, PageCont } from '../../../../styles/components/default';

const Mypage: NextPage = () => {
  //
  return (
    <>
      <Title title="마이페이지" />
      <PageCont>
        <Cont>
          <h1>MY BOARDS</h1>
          <h1>MY POSTS</h1>
          <h1>MY REVIEWS</h1>
          <h1>Likes</h1>
          <h1>Questions</h1>
        </Cont>
      </PageCont>
    </>
  );
};
export default Mypage;

const Cont = styled.section`
  h1 {
    font-size: 2rem;
    font-weight: 700;
    font-style: italic;
  }
`;
