import useSWR from 'swr';
import { useState } from 'react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import useUser from '../../../../../src/libs/client/useUser';
import { IGetReview } from '../../../../../src/types/review';
import { DeleteModal } from '../../../../../src/components/Modal/Board/Delete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import useAvatar from '../../../../../src/libs/client/useAvatar';
import { LikesAndComments } from '../../../../../src/components/Post/Icon';
import { Btn } from '../../../../../styles/btn';
import { ThumNail } from '../../../../../styles/image';

const Review_Detail: NextPage = () => {
  const router = useRouter();
  const { review_id } = router.query;
  const { isloggedIn, loggedInUser } = useUser();
  const isQueryId = loggedInUser && review_id;
  const { data } = useSWR<IGetReview>(
    isQueryId && `/api/user/${loggedInUser.id}/review/${review_id}`
  );
  //
  const BtnShow = Boolean(
    isloggedIn && data?.review?.UserID === loggedInUser?.id
  );
  const clickEdit = () =>
    router.push(
      `/user/${data?.review?.UserID}/review/${data?.review?.id}/edit`
    );
  const [openSetup, setOpenSetup] = useState(false);
  const [delModal, setDelModal] = useState(false);
  //
  return (
    <>
      <Cont>
        <BtnWrap>
          <Button type="button" onClick={() => router.push(`/all/reviews`)}>
            Review
          </Button>
          {BtnShow && (
            <>
              <Button type="button" onClick={() => setOpenSetup((p) => !p)}>
                {openSetup ? 'Back' : 'Setting'}
              </Button>
              {openSetup && (
                <BtnWrap>
                  <Button type="button" onClick={clickEdit}>
                    Edit
                  </Button>
                  <Button type="button" onClick={() => setDelModal((p) => !p)}>
                    Delete
                  </Button>
                </BtnWrap>
              )}
            </>
          )}
        </BtnWrap>
        <ReviewList>
          <h1>{data?.review?.title}</h1>
          <ul>
            <li>
              <span className="title">Movie: </span>
              <span>{data?.review?.movieTitle}</span>
            </li>
            <li>
              <span className="title">Genre: </span>
              <span>{data?.review?.genre}</span>
            </li>
            <li>
              <span className="title">별점: </span>
              <>
                {[1, 2, 3, 4, 5].map((score) => (
                  <span key={score}>
                    {data?.review?.score! >= score ? (
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
              <span className="title">한줄평: </span>
              {data?.review?.oneline && (
                <Oneline>"{data?.review?.oneline}"</Oneline>
              )}
            </li>
            <ThumNail>
              {data?.review?.avatar ? (
                <img
                  src={`${useAvatar(data?.review?.avatar)}`}
                  alt="리뷰 이미지"
                />
              ) : (
                <img src="/img/post_thum.svg" alt="파일 업로드" />
              )}
            </ThumNail>
            <li>
              <Content>{data?.review?.content}</Content>
            </li>
          </ul>
        </ReviewList>
        <LikesAndComments type="review" />
      </Cont>
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

const Cont = styled.section`
  padding: 20px 20%;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
`;

const Oneline = styled.span`
  font-style: italic;
  font-weight: 500;
`;

const ReviewList = styled.ul`
  margin: 20px auto;
  h1 {
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
  }
  ul {
    margin: 20px auto;
    li {
      gap: 5px;
      display: flex;
      align-items: center;
      font-size: 1.2rem;
      margin-bottom: 8px;
      .title {
        font-weight: 600;
      }
    }
  }
`;
const Content = styled.p`
  font-size: 1.2rem;
  width: 80%;
  margin: 0 auto;
  padding: 20px 40px;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.input};
`;
const BtnWrap = styled.div`
  gap: 6px;
  display: flex;
  align-items: center;
`;

const Button = styled(Btn)`
  font-size: 1rem;
  width: 90px;
  height: 40px;
`;
