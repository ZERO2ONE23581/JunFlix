import useSWR from 'swr';
import { useState } from 'react';
import styled from '@emotion/styled';
import { PostList } from '../../Post/Read/List';
import { ReviewList } from '../../Review/Read/ReviewList';
import { PostModel, ReviewModel } from '../../../types/post';
import useUser from '../../../libs/client/useUser';

interface IGetMyLikes {
  ok: boolean;
  error?: string;
  MyPostLikes: PostModel[];
  MyReviewLikes: ReviewModel[];
}
export const LikesList = () => {
  const { loggedInUser } = useUser();
  const { data } = useSWR<IGetMyLikes>(`/api/user/my/likes`);
  const LikedPosts = data?.MyPostLikes;
  const LikedReviews = data?.MyReviewLikes;
  const [type, setType] = useState('post');
  return (
    <Cont>
      <BtnWrap>
        <Button
          Type={type}
          type="button"
          likeType="post"
          onClick={() => setType('post')}
        >
          <span className="username">{loggedInUser?.username}</span>
          <span>님이 좋아하는 포스트</span>
        </Button>
        <Button
          Type={type}
          type="button"
          likeType="review"
          onClick={() => setType('review')}
        >
          <span className="username">{loggedInUser?.username}</span>
          <span>님이 좋아하는 리뷰</span>
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
  .username {
    font-size: 1.2rem;
    margin-right: 4px;
    font-style: italic;
  }
`;
