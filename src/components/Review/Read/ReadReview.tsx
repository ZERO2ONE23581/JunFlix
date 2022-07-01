import useSWR from 'swr';
import { Stars } from './Stars';
import { Setting } from './Setting';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useUser from '../../../libs/client/useUser';
import { IGetReview } from '../../../types/review';
import { IconBtn } from '../../Style/Button/IconBtn';
import { ThumnailAvatar } from '../../Avatar/Thumnail';
import { CapFirstLetter } from '../../Tools';

export const ReadReview = () => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const { user_id, review_id } = router.query;
  const IsOwner = String(loggedInUser?.id) === user_id;
  const QueryId = user_id && review_id;
  const { data } = useSWR<IGetReview>(
    QueryId && `/api/user/${user_id}/review/${review_id}`
  );
  const review = data?.review;
  //
  const [date, setDate] = useState('');
  const [updateAt, setUpdateAt] = useState('');
  useEffect(() => {
    if (review) {
      const date = new Date(review.createdAt);
      const updateDate = new Date(review.updatedAt);
      setDate(
        `${date.getFullYear()}. ${
          date.getMonth() + 1
        }. ${date.getDate()}. ${date.getHours()}:${date.getMinutes()}`
      );
      setUpdateAt(
        `${updateDate.getFullYear()}. ${
          updateDate.getMonth() + 1
        }. ${updateDate.getDate()}. ${updateDate.getHours()}:${updateDate.getMinutes()}`
      );
    }
  }, [setDate, setUpdateAt, review]);
  const MOVIE_TITLE = review?.movieTitle.toUpperCase();
  //
  return (
    <>
      <Cont>
        <Info>
          <Genre>
            <span>장르:</span>
            <span>{review?.genre}</span>
          </Genre>
          <Title>
            <span className="movie-title">'{MOVIE_TITLE}' review: </span>
            <span className="review-title">
              {CapFirstLetter(review?.title!)}
            </span>
          </Title>
          <OneLine>"{review?.oneline}"</OneLine>
          <StarInfo>
            <span>Stars to the movie</span>
            <span>"{MOVIE_TITLE}"</span>
            <Stars score={review?.score!} />
            <span>- {review?.user.username}</span>
          </StarInfo>
          <div className="date">
            <div className="update">
              <span>Updated at</span>
              <span>{updateAt}</span>
            </div>
            <div className="created">
              <span>Created at</span>
              <span>{date}</span>
              <span>by</span>
              <span>{review?.user.username}</span>
              <span>@{review?.user.userId}</span>
            </div>
          </div>
        </Info>
        <ThumnailAvatar url={review?.avatar} />
        <Content>
          <p>{review?.content}</p>
        </Content>
      </Cont>
      <BtnWrap>
        <IconBtn
          type="button"
          svgType="compass"
          onClick={() => router.push(`/user/all/reviews`)}
        />
        {IsOwner && <Setting />}
      </BtnWrap>
    </>
  );
};
const Cont = styled.article`
  position: relative;
  min-width: 1000px;
  .thumnail-avatar {
    height: 60vh;
    opacity: 0.9;
    z-index: 1;
  }
`;
const BtnWrap = styled.div`
  z-index: 2;
  position: fixed;
  top: 15%;
  right: 1%;
  gap: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const Info = styled.div`
  padding: 2% 20%;
  gap: 15px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  .date {
    margin-top: 20px;
    opacity: 0.7;
    font-size: 1.1rem;
    font-style: italic;
    //
    gap: 5px;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    justify-content: center;
    .update {
      color: ${(p) => p.theme.color.logo};
    }
    span {
      margin-right: 7px;
    }
  }
`;
const Genre = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  color: #0984e3;
  span {
    margin-right: 10px;
  }
`;
const Title = styled.div`
  line-height: 50px;
  .movie-title {
    font-size: 3.3em;
  }
  .review-title {
    font-style: italic;
    font-size: 3rem;
  }
`;
const OneLine = styled.p`
  font-size: 1.8rem;
  opacity: 0.8;
  font-style: italic;
`;

const Content = styled.article`
  padding: 2% 20%;
  border: none;
  p {
    font-size: 1.6rem;
    font-weight: 300;
    line-height: 30px;
  }
`;
const StarInfo = styled.article`
  width: 100%;
  gap: 0.5em;
  display: flex;
  align-items: center;
  font-style: italic;
  color: ${(p) => p.theme.color.logo};
`;
