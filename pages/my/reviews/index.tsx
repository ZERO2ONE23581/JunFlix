import type { NextPage } from 'next';
import useSWR from 'swr';
import { Title } from '../../../src/components/Layout/Title';
import { ReviewList } from '../../../src/components/Review';
import useUser from '../../../src/libs/client/useUser';
import { IGetReviews } from '../../../src/types/review';

const MyReviews: NextPage = () => {
  const { isloggedIn, loggedInUser } = useUser();
  const { data } = useSWR<IGetReviews>(isloggedIn && `/api/my/reviews`);
  return (
    <>
      <Title title="나의 리뷰" />
      <ReviewList
        myReview={true}
        loggedInUser={loggedInUser}
        reviews={data?.reviews}
      />
    </>
  );
};
export default MyReviews;
