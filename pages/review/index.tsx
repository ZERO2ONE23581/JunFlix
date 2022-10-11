import useSWR from 'swr';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { IGetReviews } from '../../src/types/review';
import { Title } from '../../src/Tools/Title';
import { HeadTitle } from '../../src/components/head_title';
import { Fixed } from '../../src/Tools/Button/Fixed';
import { ReviewList } from '../../src/components/review/Read/List';
import { NoData } from '../../src/Tools/NoData';

const All_Reviews: NextPage<{ theme: boolean }> = ({ theme }) => {
  const { data } = useSWR<IGetReviews>(`/api/reviews`);
  return (
    <>
      <HeadTitle title="All Reviews" />
      <Cont>
        <Title type="review" reviewType="all" />
        {data?.reviews && <ReviewList reviews={data?.reviews} />}
        {!data?.reviews && <NoData type="review" />}
        <Fixed type="read-review" />
      </Cont>
    </>
  );
};
export default All_Reviews;

export const Cont = styled(Page)`
  padding: 5%;
`;
