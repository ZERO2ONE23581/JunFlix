import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { CreateReview } from '../../../../../src/components/Review/Create/CreateReview';
import { Page } from '../../../../../styles/global';

const CreateReviewPage: NextPage = () => {
  return (
    <PageCont>
      <CreateReview />
    </PageCont>
  );
};
export default CreateReviewPage;

const PageCont = styled(Page)`
  padding: 2% 15%;
`;
