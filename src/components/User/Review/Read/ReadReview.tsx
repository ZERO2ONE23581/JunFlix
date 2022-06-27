import useSWR from 'swr';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import useUser from '../../../../libs/client/useUser';
import { IGetReview } from '../../../../types/review';
import { ThumnailAvatar } from '../../Avatar/Thumnail';
import { IconBtn } from '../../../Style/Button/IconBtn';
import { Setting } from './Setting';
import { Stars } from './Stars';
import { ProfileAvatar } from '../../Avatar/Profile';
import { useEffect, useState } from 'react';

interface IReadReviewProps {}
export const ReadReview = ({}: IReadReviewProps) => {
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
  useEffect(() => {
    if (review) {
      const date = new Date(review.createdAt);
      setDate(
        `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
      );
    }
  }, [setDate, review]);
  //
  return (
    <>
      <Cont>
        <BtnWrap>
          <IconBtn
            type="button"
            svgType="compass"
            onClick={() => router.push(`/all/reviews`)}
          />
          {IsOwner && <Setting />}
        </BtnWrap>
        <Info>
          <Genre>
            <span>장르:</span>
            <span>{review?.genre}</span>
          </Genre>
          <Title>
            <span className="movie-title">'{review?.movieTitle}' review: </span>
            <span className="review-title">{review?.title}</span>
          </Title>
          <OneLine>"{review?.oneline}"</OneLine>
          <Stars
            score={review?.score!}
            movieTitle={review?.movieTitle!}
            reviewer={review?.user.username!}
          />
          <div className="date">
            <span>created at</span>
            <span>{date}</span>
            <span>by</span>
            <span>{review?.user.username}</span>
            <span>@{review?.user.userId}</span>
          </div>
        </Info>
        <ThumnailAvatar url={review?.avatar} />
        <Content>
          <p>{review?.content}</p>
        </Content>
      </Cont>
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
  padding: 2% 25%;
  gap: 15px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  .date {
    margin-top: 20px;
    opacity: 0.8;
    display: flex;
    font-size: 1.1rem;
    font-style: italic;
    justify-content: end;
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
  font-size: 4rem;
  .review-title {
    font-style: italic;
  }
`;
const OneLine = styled.p`
  font-size: 1.8rem;
  opacity: 0.8;
  font-style: italic;
`;

const Content = styled.article`
  padding: 2% 25%;
  border: none;
  p {
    font-size: 1.6rem;
    font-weight: 300;
    line-height: 30px;
  }
`;
