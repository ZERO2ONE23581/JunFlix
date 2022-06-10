import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Title } from '../../../src/components/Layout/Title';
import { ReviewList } from '../../../src/components/Review';
import useUser from '../../../src/libs/client/useUser';
import { Page } from '../boards';

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
