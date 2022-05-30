import type { NextPage } from 'next';
import useSWR from 'swr';
import { Title } from '../../../src/components/Layout/parts/Title';
import { ReviewList } from '../../../src/components/Review';
import useUser from '../../../src/libs/client/useUser';
import { IGetReviews } from '../../../src/types/review';

const All_Reviews: NextPage = () => {
  const { data } = useSWR<IGetReviews>(`/api/all/review`);
  return (
    <>
      <Title title="모든 리뷰" />
      <ReviewList reviews={data?.reviews} />
    </>
  );
};
export default All_Reviews;
