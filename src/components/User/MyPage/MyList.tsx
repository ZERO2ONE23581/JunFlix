import useSWR from 'swr';
import { useState } from 'react';
import { BtnWrap } from './BtnWrap';
import styled from '@emotion/styled';
import { Post } from '@prisma/client';
import { LikesList } from './LikesList';
import { PostList } from '../../Post/Read/List';
import { BoardWithUser } from '../../../types/board';
import { BoardList } from '../../Board/Read/BoardList';
import { ReviewWithUser } from '../../../types/review';
import { ReviewList } from '../../Review/Read/ReviewList';
import { LikesWithPost, LikesWithReview } from '../../../types/likes';

interface IGet {
  ok: boolean;
  error: string;
  boards?: BoardWithUser[];
  posts?: Post[];
  postlikes: LikesWithPost[];
  reviewLikes: LikesWithReview[];
  reviews?: ReviewWithUser[];
}
export const MyList = () => {
  const [type, setType] = useState('board');
  const GetAPI = (type: string) => {
    if (type === 'board') return `/api/user/my/boards`;
    if (type === 'post') return `/api/user/my/posts`;
    if (type === 'review') return `/api/user/my/reviews`;
    if (type === 'likes') return `/api/user/my/likes`;
  };
  const { data } = useSWR<IGet>(GetAPI(type));
  const SelectType = (type: string) => setType(type);
  return (
    <Cont>
      <BtnWrap type={type} SelectType={SelectType} />
      <>
        {type === 'board' && <BoardList boards={data?.boards!} />}
        {type === 'post' && <PostList posts={data?.posts!} />}
        {type === 'review' && <ReviewList reviews={data?.reviews!} />}
        {type === 'likes' && <LikesList />}
      </>
    </Cont>
  );
};
const Cont = styled.article`
  margin: 3rem auto;
  .review-list {
    min-width: auto;
  }
`;