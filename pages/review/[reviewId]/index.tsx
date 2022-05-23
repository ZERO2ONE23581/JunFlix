import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { IGetMyReview } from '../../../src/types/review';
import {
  Article,
  ReviewArticle,
  ReviewPageCont,
} from '../../../styles/components/default';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Btn } from '../../../src/components/Btn';
import useUser from '../../../src/libs/client/loggedInUser';

const myReview: NextPage = () => {
  const { isloggedIn, loggedInUser } = useUser();
  const router = useRouter();
  const { reviewId } = router.query;
  const { data: reviewData } = useSWR<IGetMyReview>(`/api/review/${reviewId}`);
  const ok = reviewData?.ok;
  const review = reviewData?.foundReview;
  console.log(reviewData);
  //
  return (
    <>
      {ok && review && (
        <ReviewPageCont>
          <ReviewArticle>
            {isloggedIn && review.UserID === loggedInUser?.id && (
              <Btn
                type="edit-review"
                btnName="리뷰 수정"
                onClick={() => router.push(`/review/${reviewId}/edit`)}
              />
            )}
            <ReviewList>
              <h1>{review.title}</h1>
              <li>
                <span>Movie: </span>
                <span>{review.movieTitle}</span>
              </li>
              <li>
                <span>Genre: </span>
                <span>{review.genre}</span>
              </li>
              <li>
                <span>별점: </span>
                <>
                  {[1, 2, 3, 4, 5].map((score) => (
                    <span key={score}>
                      {review.score! >= score ? (
                        <FontAwesomeIcon
                          key={score}
                          icon={faStar}
                          style={{ color: 'red' }}
                        />
                      ) : (
                        <FontAwesomeIcon key={score} icon={faStar} />
                      )}
                    </span>
                  ))}
                </>
              </li>
              <li>
                <span>한줄평: </span>
                <input
                  disabled
                  type="text"
                  placeholder="I recommend this movie!"
                />
              </li>
              <li>
                <p>{review.content}</p>
              </li>
            </ReviewList>
          </ReviewArticle>
        </ReviewPageCont>
      )}
    </>
  );
};
export default myReview;

const ReviewList = styled.ul`
  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
  }
  li {
    display: flex;
    align-items: center;
    gap: 5px;
    span {
      font-size: 1rem;
      margin-bottom: 5px;
    }
    p {
      padding: 5px;
    }
  }
`;
