import styled from '@emotion/styled';
import { Post, Review, User } from '@prisma/client';
import { useState } from 'react';
import useSWR from 'swr';
import { Icons } from '../../../../styles/svg';
import useMutation from '../../../libs/client/useMutation';

interface IGetReview {
  ok: boolean;
  error?: string;
  isLiked?: boolean;
  review: ReviewWithUser;
}
interface ReviewWithUser extends Review {
  user: User;
  _count: {
    likes: number;
  };
}

export const ReviewLikes = ({ userId, reviewId }: any) => {
  const urlData = Boolean(userId && reviewId);
  const { data: ReviewData, mutate: ReviewMutate } = useSWR<IGetReview>(
    urlData && `/api/user/${userId}/review/${reviewId}/detail`
  );
  const likesCount = ReviewData?.review?._count.likes;
  const [createLikes] = useMutation(
    `/api/user/${userId}/review/${reviewId}/likes/create`
  );
  const [comments, setComments] = useState(false);
  const handleClick = (type: string) => {
    if (!ReviewData) return;
    ReviewMutate(
      {
        ...ReviewData,
        isLiked: !ReviewData.isLiked,
        review: {
          ...ReviewData.review,
          _count: {
            ...ReviewData.review?._count,
            likes: ReviewData.isLiked
              ? ReviewData.review?._count.likes - 1
              : ReviewData.review?._count.likes + 1,
          },
        },
      },
      false
    );
    if (type === 'comments') {
      setComments((p) => !p);
    }
    createLikes({});
  };
  //
  return (
    <>
      <BtnWrap>
        <Btn onClick={() => handleClick('likes')}>
          {!ReviewData?.isLiked ? (
            <Icons name="likes" type="empty" />
          ) : (
            <Icons name="likes" type="solid" />
          )}
        </Btn>
        <Btn onClick={() => handleClick('comments')}>
          {!comments ? (
            <Icons name="comments" type="empty" />
          ) : (
            <Icons name="comments" type="solid" />
          )}
        </Btn>
      </BtnWrap>
      <CountsWrap className="btnWithCounts">
        <Counts>
          <span>{likesCount ? likesCount : '0'}</span>
          <span> Likes</span>
        </Counts>
      </CountsWrap>
    </>
  );
};
const Counts = styled.article`
  text-align: center;
  font-weight: 500;
`;
const Btn = styled.button`
  border: none;
  background-color: inherit;
`;
const BtnWrap = styled.article`
  border: 2px solid red;
  padding: 0 10px;
  gap: 20px;
  display: flex;
  align-items: center;
`;
const CountsWrap = styled(BtnWrap)`
  border: 2px solid blue;
`;
