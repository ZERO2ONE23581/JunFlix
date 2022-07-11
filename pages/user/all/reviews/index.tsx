import useSWR from 'swr';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../../../styles/global';
import { IGetReviews } from '../../../../src/types/review';
import { Svg } from '../../../../src/components/Style/Svg/Svg';
import { Title } from '../../../../src/components/Layout/Title';
import { ReviewList } from '../../../../src/components/Review/Read/List';

const AllReviewsPage: NextPage = () => {
  const { data } = useSWR<IGetReviews>(`/api/user/all/reviews`);
  return (
    <>
      <Title title="All Reviews" />
      <ReviewPage>
        <h1>
          <Svg type="clapper" />
          <span>Movie Reivew</span>
          <span className="kor">영화 리뷰</span>
        </h1>
        {data?.reviews ? (
          <ReviewList reviews={data?.reviews} />
        ) : (
          <>
            <h1>NO REVIES FOUND...</h1>
          </>
        )}
      </ReviewPage>
    </>
  );
};
export default AllReviewsPage;

export const ReviewPage = styled(Page)`
  padding: 2% 5%;
  h1 {
    gap: 1rem;
    display: flex;
    align-items: center;
    font-size: 2rem;
    margin-left: 2rem;
    svg {
      margin-top: 7px;
      width: 0.8em;
      height: 0.8em;
      :hover {
        fill: ${(p) => p.theme.color.font};
      }
    }
    .kor {
      opacity: 0.8;
      font-size: 1.8rem;
    }
  }
`;
