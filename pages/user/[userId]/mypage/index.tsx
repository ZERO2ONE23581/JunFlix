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
      <AllMyBoards />
      <AllMyPosts />
      <AllMyReviews />
      {/* <H1>Likes</H1>
      <H1>Comments</H1> */}
    </PageCont>
  );
};
export default Mypage;
