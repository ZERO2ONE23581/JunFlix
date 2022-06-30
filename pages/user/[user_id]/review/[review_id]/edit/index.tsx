import { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../../../../../../styles/global';
import { Title } from '../../../../../../src/components/Layout/Title';
import { EditReview } from '../../../../../../src/components/Review/Edit/EditReview';
import { IconBtn } from '../../../../../../src/components/Style/Button/IconBtn';
import { useState } from 'react';
import { ReviewAnswer } from '../../../../../../src/components/Review/Edit/ReviewAnswer';

const EditReviewPage: NextPage = () => {
  const [answer, setAnswer] = useState(false);
  return (
    <>
      <Title title="리뷰수정" />
      <PageCont>
        <EditReview />
        <IconBtn
          type="button"
          svgType="question"
          onClick={() => setAnswer(true)}
        />
        {answer && <ReviewAnswer openModal={setAnswer} />}
      </PageCont>
    </>
  );
};
export default EditReviewPage;

const PageCont = styled(Page)`
  padding: 2% 15%;
  .question {
    right: 5rem;
    bottom: 5rem;
    position: fixed;
  }
`;
