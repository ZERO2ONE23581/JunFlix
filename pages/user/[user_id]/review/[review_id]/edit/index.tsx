import { NextPage } from 'next';
import { useState } from 'react';
import styled from '@emotion/styled';
import { Page } from '../../../../../../styles/global';
import { HeadTitle } from '../../../../../../src/components/Layout/Head';
import { EditReview } from '../../../../../../src/components/Review/Update';
import { IconBtn } from '../../../../../../src/components/Tools/Button/Icon';
import { Answer } from '../../../../../../src/components/Tools/Modal/Answer';

const EditReviewPage: NextPage = () => {
  const [answer, setAnswer] = useState(false);
  return (
    <>
      <HeadTitle title="리뷰수정" />
      <Cont>
        <EditReview />
        <IconBtn
          size="3.3rem"
          type="button"
          svgType="question"
          onClick={() => setAnswer(true)}
        />
        {answer && <Answer type="edit-review" closeModal={setAnswer} />}
      </Cont>
    </>
  );
};
export default EditReviewPage;

const Cont = styled(Page)`
  padding: 2% 0;
  min-height: 100%;
  .question {
    right: 30px;
    bottom: 50px;
    position: fixed;
  }
`;
