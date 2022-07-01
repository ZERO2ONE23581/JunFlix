import useSWR from 'swr';
import type { NextPage } from 'next';
import { ReviewPage } from '../../all/reviews';
import useUser from '../../../../src/libs/client/useUser';
import { IGetReviews } from '../../../../src/types/review';
import { Title } from '../../../../src/components/Layout/Title';
import { Svg } from '../../../../src/components/Style/Svg/Svg';
import { ReviewList } from '../../../../src/components/Review/Read/ReviewList';

const MyReviews: NextPage = () => {
  const { loggedInUser } = useUser();
  const { data } = useSWR<IGetReviews>(`/api/user/my/reviews`);
  return (
    <>
      <Title title={`${loggedInUser?.username}'s Reviews`} />
      <ReviewPage>
        <h1>
          <Svg type="clapper" />
          <span>My Reivew</span>
          <span className="kor">나의 리뷰</span>
        </h1>
        {data?.reviews ? (
          <ReviewList reviews={data?.reviews} />
        ) : (
          <>
            <h1>NO REVIES FOUND...</h1>
          </>
        )}
      </ReviewPage>
    </>
  );
};
export default MyReviews;
