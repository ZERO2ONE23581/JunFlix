import type { NextPage } from 'next';
import { Title } from '../../../../src/components/Layout/parts/Title';
import { AllMyReviews } from '../../../../src/components/MyPage/AllMyReviews';

const MyBoards: NextPage = () => {
  return (
    <>
      <Title title="나의 리뷰" />
      <AllMyReviews />
    </>
  );
};
export default MyBoards;
