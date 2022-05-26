import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Title } from '../../../../src/components/Layout/parts/Title';
import { AllMyPosts } from '../../../../src/components/MyPage/AllMyPosts';
import { AllMyBoards } from '../../../../src/components/MyPage/AllMyBoards';
import { AllMyReviews } from '../../../../src/components/MyPage/AllMyReviews';
import { PageCont } from '../../../../styles/components/default';

const Mypage: NextPage = () => {
  //
  return (
    <PageCont>
      <Title title="마이페이지" />
      <H1>MY BOARDS</H1>
      <AllMyBoards />
      <H1>MY POSTS</H1>
      <AllMyPosts />
      <H1>MY REVIEWS</H1>
      <AllMyReviews />
      <H1>Likes</H1>
      <H1>Questions</H1>
    </PageCont>
  );
};
export default Mypage;

const H1 = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  font-style: italic;
  margin-left: 70px;
  margin-top: 20px;
`;
