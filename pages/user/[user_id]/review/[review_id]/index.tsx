import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../../../../styles/global';
import { Title } from '../../../../../src/components/Layout/Title';
import { ReadReview } from '../../../../../src/components/Review/Read/ReadReview';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { IGetReview } from '../../../../../src/types/review';

const ReviewPage: NextPage = () => {
  return (
    <>
      <Title title="MOVIE REVIEW" />
      <Cont>
        <ReadReview />
      </Cont>
    </>
  );
};
export default ReviewPage;

const Cont = styled(Page)`
  padding: 0;
`;
