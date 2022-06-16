import type { NextPage } from 'next';
import { Page } from '../../../../styles/global';
import useUser from '../../../../src/libs/client/useUser';
import { Title } from '../../../../src/components/Layout/Title';
import { ReviewList } from '../../../../src/components/User/Review/ReviewList';

const MyReviews: NextPage = () => {
  const { loggedInUser } = useUser();
  return (
    <>
      <Title title="나의 리뷰" />
      <Page>
        <h1>{loggedInUser?.username}'s Reviews</h1>
        <ReviewList isMyReview={Boolean(loggedInUser)} />
      </Page>
    </>
  );
};
export default MyReviews;
