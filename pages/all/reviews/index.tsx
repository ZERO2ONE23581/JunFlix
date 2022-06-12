import type { NextPage } from 'next';
import { Title } from '../../../src/components/Layout/Title';
import { ReviewList } from '../../../src/components/Review/list';
import { Page } from '../../my/boards';

const AllReviews: NextPage = () => {
  return (
    <>
      <Title title="모든 리뷰" />
      <Page>
        <h1>모든 리뷰</h1>
        <ReviewList isAllReviews={true} />
      </Page>
    </>
  );
};
export default AllReviews;
