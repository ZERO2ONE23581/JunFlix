import { NextPage } from 'next';
import styled from '@emotion/styled';
import { Title } from '../../../../../../src/components/Layout/Title';
import { EditReview } from '../../../../../../src/components/Review/Edit';
import { IconBtn } from '../../../../../../src/components/Style/Button/IconBtn';
import { useState } from 'react';
import { Answer } from '../../../../../../src/components/Review/Read/modal/answer';
import { ReviewPG } from '../../create';

const EditReviewPage: NextPage = () => {
  const [answer, setAnswer] = useState(false);
  return (
    <>
      <Title title="리뷰수정" />
      <Cont>
        <EditReview />
        <IconBtn
          size="3.3rem"
          type="button"
          svgType="question"
          onClick={() => setAnswer(true)}
        />
        {answer && <Answer openModal={setAnswer} />}
      </Cont>
    </>
  );
};
export default EditReviewPage;

const Cont = styled(ReviewPG)`
  .question {
    right: 30px;
    bottom: 50px;
    position: fixed;
  }
`;
