import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../../../../styles/global';
import { Title } from '../../../../../src/components/Layout/Title';
import { ReadReview } from '../../../../../src/components/Review/Read/ReadReview';
import { ReviewComments } from '../../../../../src/components/Review/Read/ReviewComments';

const ReviewPage: NextPage = () => {
  return (
    <>
      <Title title="영화리뷰" />
      <Cont>
        <ReadReview />
        <ReviewComments />
      </Cont>
    </>
  );
};
export default ReviewPage;

const Cont = styled(Page)`
  padding: 0;
`;
