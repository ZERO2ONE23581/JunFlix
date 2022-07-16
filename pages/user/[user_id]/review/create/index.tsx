import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../../../../styles/global';
import { CreateReview } from '../../../../../src/components/Review/Create';

const CreateReviewPage: NextPage = () => {
  return (
    <PageCont>
      <CreateReview />
    </PageCont>
  );
};
export default CreateReviewPage;

const PageCont = styled(Page)`
  padding: 0% 20%;
  padding-bottom: 5%;
`;
