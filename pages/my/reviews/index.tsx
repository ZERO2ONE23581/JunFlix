import type { NextPage } from 'next';
import { Title } from '../../../src/components/Layout/Title';
import { ReviewList } from '../../../src/components/Review';

const MyReviews: NextPage = () => {
  return (
    <>
      <Title title="나의 리뷰" />
      <h1>나의 리뷰</h1>
      <ReviewList isMyReview={true} />
    </>
  );
};
export default MyReviews;
