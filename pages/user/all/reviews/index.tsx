import useSWR from 'swr';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../../../styles/global';
import { IGetReviews } from '../../../../src/types/review';
import { ReviewList } from '../../../../src/components/Review/Read/List';
import { Title, TitleSign } from '../../../../src/components/Layout/Title';

const AllReviews: NextPage = () => {
  const { data } = useSWR<IGetReviews>(`/api/user/all/reviews`);
  return (
    <>
      <Title title="All Reviews" />
      <Cont>
        <TitleSign
          width="250px"
          svg="clapper"
          svgSize="1.8rem"
          type="Movie Reviews"
        />
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

export const Cont = styled(Page)`
  padding: 0% 8%;
  .review-list {
    min-width: 1200px;
  }
`;
