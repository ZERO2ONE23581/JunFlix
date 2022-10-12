import useSWR from 'swr';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { IGetReviews } from '../../src/types/review';
import { HeadTitle } from '../../src/components/head_title';
import { ReviewList } from '../../src/components/review/Read/List';

const All_Reviews: NextPage<{ theme: boolean }> = ({ theme }) => {
  const { data } = useSWR<IGetReviews>(`/api/review/all`);
  return (
    <>
      <HeadTitle title="All Reviews" />
      <Cont>{data?.reviews && <ReviewList reviews={data?.reviews} />}</Cont>
    </>
  );
};
export default All_Reviews;

export const Cont = styled(Page)`
  padding: 5%;
`;
