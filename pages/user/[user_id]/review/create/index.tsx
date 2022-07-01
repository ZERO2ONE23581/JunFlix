import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { CreateReview } from '../../../../../src/components/Review/Create/CreateReview';
import { Page } from '../../../../../styles/global';

const CreateReviewPage: NextPage = () => {
  return (
    <PageCont>
      <h1>Create Review</h1>
      <CreateReview />
    </PageCont>
  );
};
export default CreateReviewPage;

const PageCont = styled(Page)`
  padding: 2% 5%;
  h1 {
    font-size: 1.6rem;
    padding-bottom: 20px;
  }
`;
