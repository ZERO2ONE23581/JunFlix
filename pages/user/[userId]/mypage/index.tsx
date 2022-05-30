import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Title } from '../../../../src/components/Layout/parts/Title';
import { AllMyPosts } from '../../../../src/components/MyPage/AllMyPosts';
import { AllMyBoards } from '../../../../src/components/MyPage/AllMyBoards';
import { AllMyReviews } from '../../../../src/components/Review/AllMyReviews';
import { PageCont } from '../../../../styles/components/default';

const Mypage: NextPage = () => {
  //
  return (
    <PageCont>
      <Title title="마이페이지" />
      <AllMyBoards />
      <AllMyPosts />
      <AllMyReviews />
    </PageCont>
  );
};
export default Mypage;
