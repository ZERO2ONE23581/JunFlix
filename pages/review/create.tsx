import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { CreateReview } from '../../src/components/Review/create';
import { useNeedLogin } from '../../src/libs/client/useTools';

const Create_Review: NextPage<{ theme: boolean }> = ({ theme }) => {
  useNeedLogin();
  return (
    <Cont>
      <CreateReview />
    </Cont>
  );
};
export default Create_Review;

export const Cont = styled(Page)`
  padding: 0% 10%;
  padding-bottom: 5%;
`;
