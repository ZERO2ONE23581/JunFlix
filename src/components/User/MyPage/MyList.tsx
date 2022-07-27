import useSWR from 'swr';
import { useState } from 'react';
import { BtnWrap } from './BtnWrap';
import { LikesList } from './LikesList';
import { PostList } from '../../Post/Read/List';
import { ReviewList } from '../../Review/Read/List';
import { IBoardWithAttrs } from '../../../types/board';
import { ReviewWithUser } from '../../../types/review';
import { LikesWithPost, LikesWithReview } from '../../../types/likes';
import { PostModel } from '../../../types/post';
import { BoardList } from '../../Board/Read/List';

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
    <>
      <BtnWrap type={type} SelectType={SelectType} />
      {type === 'board' && <BoardList isMyPage boards={data?.boards!} />}
      {type === 'post' && <PostList isMyPage posts={data?.posts!} />}
      {type === 'review' && <ReviewList isMyPage reviews={data?.reviews!} />}
      {type === 'likes' && <LikesList />}
    </>
  );
};
