import type { NextPage } from 'next';
import useSWR from 'swr';
import { Title } from '../../../src/components/Layout/Title';
import { ReviewList } from '../../../src/components/Review';
import { IGetReviews } from '../../../src/types/review';

const All_Reviews: NextPage = () => {
  const { data } = useSWR<IGetReviews>(`/api/all/reviews`);
  return (
    <>
      <Title title="모든 리뷰" />
      <ReviewList allReviews={true} reviews={data?.reviews} />
    </>
  );
};
export default All_Reviews;
