import type { NextPage } from 'next';
import { Title } from '../../../src/components/Layout/Title';
import { ReviewList } from '../../../src/components/Review';

const All_Reviews: NextPage = () => {
  return (
    <>
      <Title title="모든 리뷰" />
      <h1>모든 리뷰</h1>
      <ReviewList isAllReviews={true} />
    </>
  );
};
export default All_Reviews;
