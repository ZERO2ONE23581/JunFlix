import type { NextPage } from 'next';
import useSWR from 'swr';
import { Title } from '../../../src/components/Layout/Title';
import { ReviewList } from '../../../src/components/Review';
import useUser from '../../../src/libs/client/useUser';
import { IGetReviews } from '../../../src/types/review';

const All_Reviews: NextPage = () => {
  const { data } = useSWR<IGetReviews>(`/api/all/reviews`);
  const { loggedInUser } = useUser();
  return (
    <>
      <Title title="모든 리뷰" />
      <ReviewList
        allReviews={true}
        loggedInUser={loggedInUser}
        reviews={data?.reviews}
      />
    </>
  );
};
export default All_Reviews;
