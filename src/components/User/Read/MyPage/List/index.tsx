import useSWR from 'swr';
import { useState } from 'react';
import { BtnWrap } from './Btns';
import { LikesList } from './Likes';
import { PostList } from '../../../../Post/Read/List';
import { ReviewList } from '../../../../Review/Read/List';
import { IBoardWithAttrs } from '../../../../../types/board';
import { LikesWithReview, ReviewWithUser } from '../../../../../types/review';
import { LikesWithPost, PostModel } from '../../../../../types/post';
import { BoardList } from '../../../../Board/Read/List';
import styled from '@emotion/styled';

export interface IGet {
  ok: boolean;
  error: string;
  boards?: IBoardWithAttrs[];
  posts?: PostModel[];
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
      {type === 'board' && <BoardList boards={data?.boards!} size={4} />}
      {type === 'post' && <PostList from={8} posts={data?.posts!} size={4} />}
      {type === 'review' && <ReviewList reviews={data?.reviews!} />}
      {type === 'likes' && <LikesList />}
    </Cont>
  );
};
const Cont = styled.article`
  .post-list {
    .post {
      min-height: 310px;
    }
  }
`;
