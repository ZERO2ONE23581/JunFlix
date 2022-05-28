import useSWR from 'swr';
import { useState } from 'react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Btn } from '../../../src/components/Btn';
import { IGetMyReview } from '../../../src/types/review';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import useUser from '../../../src/libs/client/useUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DeleteModal } from '../../../src/components/Modal/board/settting/delete/modal';
import {
  Flex,
  FlexAbsolute,
  ReviewArticle,
  PageSectionWide,
} from '../../../styles/components/default';

const myReview: NextPage = () => {
  const router = useRouter();
  const { reviewId } = router.query;
  const { isloggedIn, loggedInUser } = useUser();
  const { data: reviewData } = useSWR<IGetMyReview>(`/api/review/${reviewId}`);
  const ok = reviewData?.ok;
  const review = reviewData?.foundReview;
  //
  const [openSetup, setOpenSetup] = useState(false);
  const [delModal, setDelModal] = useState(false);
  //
  return (
    <>
      {ok && review && delModal && (
        <DeleteModal
          reviewId={review.id}
          userId={review.UserID}
          deleteClick={() => setDelModal((p) => !p)}
        />
      )}

      {ok && review && (
        <PageSectionWide>
          <ReviewArticle>
            <Btn
              btnName="Back"
              type="review-back-btn"
              onClick={() => router.push(`/review`)}
            />

            {isloggedIn && review.UserID === loggedInUser?.id && (
              <>
                <Btn
                  type="edit-setting"
                  btnName={openSetup ? 'Back' : 'Setting'}
                  onClick={() => setOpenSetup((p) => !p)}
                />
                {openSetup && (
                  <FlexAbsolute>
                    <Btn
                      type="edit-review"
                      btnName="리뷰 수정"
                      onClick={() => router.push(`/review/${reviewId}/edit`)}
                    />
                    <Btn
                      type="delete-review"
                      btnName="리뷰 삭제"
                      onClick={() => setDelModal((p) => !p)}
                    />
                  </FlexAbsolute>
                )}
              </>
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
        </PageSectionWide>
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
