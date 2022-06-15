import type { NextPage } from 'next';
import { H1, Page } from '../../../../styles/global';
import { Title } from '../../../../src/components/Layout/Title';
import { ReviewList } from '../../../../src/components/Review/list';

const AllReviews: NextPage = () => {
  return (
    <>
      <Title title="모든 리뷰" />
      <Page>
        <section className="flex-column">
          <H1>All Reviews</H1>
          <ReviewList isAllReviews={true} />
        </section>
      </Page>
    </>
  );
};
export default AllReviews;
