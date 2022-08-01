import useSWR from 'swr';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../../styles/global';
import { Title } from '../../../src/components/Title';
import { IGetReviews } from '../../../src/types/review';
import { HeadTitle } from '../../../src/components/Title/Head';
import { ReviewList } from '../../../src/components/Review/Read/List';

const AllReviews: NextPage = () => {
  const { data } = useSWR<IGetReviews>(`/api/user/all/reviews`);
  return (
    <>
      <HeadTitle title="All Reviews" />
      <Cont>
        <Title kind="Reviews" svg={{ type: 'clapper', size: '2rem' }} />
        {data?.reviews && <ReviewList reviews={data?.reviews} />}
        {!data?.reviews && (
          <>
            <h1>NO REVIES FOUND...</h1>
          </>
        )}
      </Cont>
    </>
  );
};
export default AllReviews;

export const Cont = styled(Page)``;
