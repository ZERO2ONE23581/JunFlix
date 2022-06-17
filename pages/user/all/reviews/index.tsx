import type { NextPage } from 'next';
import { Page } from '../../../../styles/global';
import { Title } from '../../../../src/components/Layout/Title';
import { ReviewList } from '../../../../src/components/User/Review/ReviewList';

const AllReviews: NextPage = () => {
  return (
    <>
      <Title title="모든 리뷰" />
      <Page>
        <section className="flex-column">
          <h1>All Reviews</h1>
          <ReviewList isAllReviews={true} />
        </section>
      </Page>
    </>
  );
};
export default AllReviews;
