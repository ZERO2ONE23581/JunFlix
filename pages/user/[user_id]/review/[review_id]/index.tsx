import useSWR from 'swr';
import { useState } from 'react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import useUser from '../../../../../src/libs/client/useUser';
import { IGetReview } from '../../../../../src/types/review';
import { DeleteModal } from '../../../../../src/components/Modal/Board/Delete';
import { FlexAbsolute, PageCont } from '../../../../../styles/default';
import { Btn } from '../../../../../src/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import useAvatar from '../../../../../src/libs/client/useAvatar';
import { ReviewLikes } from '../../../../../src/components/Button/Likes';
import { ThumNail } from '../../../../../src/components/Post/PostList';
import { LikesAndComments } from '../../../../../src/components/Post/Icon';

const Review_Detail: NextPage = () => {
  const router = useRouter();
  const { review_id } = router.query;
  const { isloggedIn, loggedInUser } = useUser();
  const isQueryId = loggedInUser && review_id;
  const { data } = useSWR<IGetReview>(
    isQueryId && `/api/user/${loggedInUser.id}/review/${review_id}`
  );
  //
  const [openSetup, setOpenSetup] = useState(false);
  const [delModal, setDelModal] = useState(false);
  //
  return (
    <>
      {data && data.ok && data.review && (
        <PageCont>
          <section className="read-review-cont">
            <Btn
              btnName="Back"
              type="review-back-btn"
              onClick={() => router.push(`/review`)}
            />

            {isloggedIn && data.review.UserID === loggedInUser?.id && (
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
                      onClick={() =>
                        router.push(
                          `/user/${data.review?.UserID}/review/${data.review?.id}/edit`
                        )
                      }
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
              <h1>{data.review.title}</h1>
              <li>
                <span>Movie: </span>
                <span>{data.review.movieTitle}</span>
              </li>
              <li>
                <span>Genre: </span>
                <span>{data.review.genre}</span>
              </li>
              <li>
                <span>별점: </span>
                <>
                  {[1, 2, 3, 4, 5].map((score) => (
                    <span key={score}>
                      {data.review?.score! >= score ? (
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
                {data.review.oneline && (
                  <Oneline>"{data.review.oneline}"</Oneline>
                )}
              </li>
              <ThumNail>
                {data.review.avatar ? (
                  <img
                    src={`${useAvatar(data.review.avatar)}`}
                    alt="리뷰 이미지"
                  />
                ) : (
                  <img src="/img/post_thum.svg" alt="파일 업로드" />
                )}
              </ThumNail>
              <li>
                <p>{data.review.content}</p>
              </li>
            </ReviewList>
          </section>
          <LikesAndComments type="review" />
        </PageCont>
      )}
      {data && data.ok && data.review && delModal && (
        <DeleteModal
          reviewId={data.review.id}
          userId={data.review.UserID}
          deleteClick={() => setDelModal((p) => !p)}
        />
      )}
    </>
  );
};
export default Review_Detail;

const Oneline = styled.span`
  font-style: italic;
  font-weight: 500;
`;

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
