import type { NextPage } from 'next';
import useSWR from 'swr';
import { Title } from '../../../../../src/components/Layout/Title';
import { ReviewList } from '../../../../../src/components/Review';
import useUser from '../../../../../src/libs/client/useUser';
import { IGetReviews } from '../../../../../src/types/review';

const My_Reviews: NextPage = () => {
  const { isloggedIn, loggedInUser } = useUser();
  const { data } = useSWR<IGetReviews>(
    loggedInUser && `/api/user/${loggedInUser.id}/review/my-reviews`
  );
  return (
    <>
      <Title title="나의 리뷰" />
      {data?.ok && data?.reviews && isloggedIn && loggedInUser && (
        <ReviewList
          myReview={true}
          loggedInUser={loggedInUser}
          reviews={data?.reviews}
        />
      )}
    </>
  );
};
export default My_Reviews;
