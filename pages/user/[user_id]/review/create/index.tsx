import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../../../../styles/global';
import { CreateReview } from '../../../../../src/components/Review/Create';

const CreateReviewPage: NextPage = () => {
  return (
    <ReviewPG>
      <CreateReview />
    </ReviewPG>
  );
};
export default CreateReviewPage;

export const ReviewPG = styled(Page)`
  padding: 0% 10% 3%;
  padding-bottom: 5%;
`;
