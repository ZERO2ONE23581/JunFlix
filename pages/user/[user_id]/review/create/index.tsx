import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../../../../styles/global';
import { CreateReview } from '../../../../../src/components/Review/Create';

const Create: NextPage = () => {
  return (
    <Cont>
      <CreateReview />
    </Cont>
  );
};
export default Create;

export const Cont = styled(Page)`
  padding: 0% 10%;
  padding-bottom: 5%;
`;
