import type { NextPage } from 'next';
import { Page } from '../../../../styles/global';
import { Title } from '../../../../src/components/Layout/Title';
import { ReviewList } from '../../../../src/components/Review/Read/ReviewList';

const AllReviews: NextPage = () => {
  return (
    <>
      <Title title="모든 리뷰" />
      <Page>
        <ReviewList isAllReviews={true} />
      </Page>
    </>
  );
};
export default AllReviews;
