import type { NextPage } from 'next';
import { PageCont } from '../../../../styles/components/default';
import { Title } from '../../../../src/components/Layout/parts/Title';
import { AllMyReviews } from '../../../../src/components/MyPage/AllMyReviews';

const MyBoards: NextPage = () => {
  return (
    <PageCont>
      <Title title="나의 리뷰" />
      <AllMyReviews />
    </PageCont>
  );
};
export default MyBoards;
