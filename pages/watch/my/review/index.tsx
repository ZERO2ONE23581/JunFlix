import type { NextPage } from 'next';
import useSWR from 'swr';
import { Title } from '../../../../src/components/Layout/parts/Title';
import { ReviewList } from '../../../../src/components/Review';
import useUser from '../../../../src/libs/client/useUser';
import { IGetReviews } from '../../../../src/types/review';

const My_Reviews: NextPage = () => {
  const { isloggedIn, loggedInUser } = useUser();
  const urlData = isloggedIn && loggedInUser;
  const { data } = useSWR<IGetReviews>(isloggedIn && `/api/my/review`);
  console.log(data);
  return (
    <>
      <Title title="나의 리뷰" />
      {data && data.ok && data.reviews && urlData && (
        <ReviewList
          isloggedIn={isloggedIn}
          loggedInUser={loggedInUser}
          reviews={data?.reviews}
        />
      )}
    </>
  );
};
export default My_Reviews;
