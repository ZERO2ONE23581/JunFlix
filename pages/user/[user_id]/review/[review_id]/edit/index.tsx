import styled from '@emotion/styled';
import { NextPage } from 'next';
import { Title } from '../../../../../../src/components/Layout/Title';
import { EditReview } from '../../../../../../src/components/Review/Edit/EditReview';
import { Page } from '../../../../../../styles/global';

const EditReviewPage: NextPage = () => {
  return (
    <>
      <Title title="리뷰수정" />
      <PageCont>
        <EditReview />
      </PageCont>
    </>
  );
};
export default EditReviewPage;

const PageCont = styled(Page)`
  padding: 2% 15%;
`;
