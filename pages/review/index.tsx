import useSWR from 'swr';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Btn } from '../../src/components/Btn';
import { IGetAllReviews } from '../../src/types/review';
import { PageContainer, ReviewPageCont } from '../../styles/components/default';
import styled from '@emotion/styled';

const allReview: NextPage = () => {
  const router = useRouter();
  const { data: reviewData } = useSWR<IGetAllReviews>(
    `/api/review/all_reviews`
  );
  console.log(reviewData?.allReviews);
  //
  return (
    <>
      <ReviewPageCont>
        <Btn
          type="create"
          btnName="Create Review"
          onClick={() => {
            router.push(`/review/create`);
          }}
        />

        {reviewData?.ok && reviewData.allReviews && (
          <>
            <ReviewList>
              {reviewData.allReviews.map((review) => (
                <ReviewWrap key={review.id}>
                  <li>
                    <ul>
                      <li>
                        <h1>{review.title}</h1>
                      </li>
                      <li>
                        <p>{review.movieTitle}</p>
                      </li>
                      <li>
                        <p>{review.genre}</p>
                      </li>
                      <li>
                        <span>Written by</span>
                        <span>{review.user.username}</span>
                      </li>
                    </ul>
                  </li>
                </ReviewWrap>
              ))}
            </ReviewList>
          </>
        )}
      </ReviewPageCont>
    </>
  );
};
export default allReview;

const ReviewList = styled.ol`
  border: 1px solid blue;
  padding: 20px;
  width: 100%;
`;
const ReviewWrap = styled.div`
  width: 100%;
  padding: 0 30px;
  ul {
    gap: 20px;
    width: 100%;
    display: flex;
    align-items: center;
    li {
      border: 1px solid red;
      h1 {
        font-size: 1.5rem;
        font-weight: 600;
      }
      span {
        &:last-of-type {
          font-weight: 700;
          margin-left: 10px;
          font-size: 1.3rem;
        }
      }
    }
  }
`;
