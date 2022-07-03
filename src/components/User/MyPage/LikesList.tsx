import useSWR from 'swr';
import { useState } from 'react';
import styled from '@emotion/styled';
import { PostList } from '../../Post/Read/PostList';
import { ReviewList } from '../../Review/Read/ReviewList';
import { PostModel, ReviewModel } from '../../../types/post';

interface IGetMyLikes {
  ok: boolean;
  error?: string;
  MyPostLikes: PostModel[];
  MyReviewLikes: ReviewModel[];
}
export const LikesList = () => {
  const { data } = useSWR<IGetMyLikes>(`/api/user/my/likes`);
  const LikedPosts = data?.MyPostLikes;
  const LikedReviews = data?.MyReviewLikes;
  const [type, setType] = useState('post');
  return (
    <Cont>
      <BtnWrap>
        <Button
          type="button"
          onClick={() => setType('post')}
          likeType="post"
          Type={type}
        >
          POST
        </Button>
        <Button
          type="button"
          onClick={() => setType('review')}
          Type={type}
          likeType="review"
        >
          REVIEW
        </Button>
      </BtnWrap>
      {type === 'post' && <PostList posts={LikedPosts!} />}
      {type === 'review' && <ReviewList reviews={LikedReviews!} />}
    </Cont>
  );
};
const Cont = styled.article`
  margin-top: 30px;
`;
const BtnWrap = styled.div`
  /* width: 90%; */
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 20px;
  overflow: hidden;
  border-radius: 3px;
  border: 3px solid ${(p) => p.theme.color.logo};
`;
const Button = styled.button<{ Type: string; likeType: string }>`
  width: 100%;
  border: none;
  outline: none;
  font-size: 1rem;
  font-weight: 550;
  padding: 12px;
  background-color: inherit;
  font-size: ${(p) => p.Type === p.likeType && '1.1rem'};
  color: ${(p) =>
    p.Type === p.likeType ? p.theme.color.logo : p.theme.color.font};
  :nth-of-type(1) {
    border-right: 3px solid ${(p) => p.theme.color.logo};
  }
`;
