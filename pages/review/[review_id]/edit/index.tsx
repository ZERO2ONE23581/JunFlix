import { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../../../../styles/global';
import { HeadTitle } from '../../../../src/components/head_title';
import { EditReview } from '../../../../src/components/review/Update';
import { Fixed } from '../../../../src/Tools/Button/Fixed';

const Edit_Review: NextPage<{ theme: boolean }> = ({ theme }) => {
  return (
    <>
      <HeadTitle title="리뷰수정" />
      <Cont>
        <EditReview />
        <Fixed type="update-review" />
      </Cont>
    </>
  );
};
export default Edit_Review;

const Cont = styled(Page)``;
