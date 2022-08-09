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
import { useRouter } from 'next/router';

export interface IGet {
  ok: boolean;
  error: string;
  posts?: PostModel[];
  reviews?: ReviewWithUser[];
  boards?: IBoardWithAttrs[];
  postlikes: LikesWithPost[];
  reviewLikes: LikesWithReview[];
}
interface IUserList {
  username: string;
}
export const UserList = ({ username }: IUserList) => {
  const router = useRouter();
  const { user_id } = router.query;
  const [type, setType] = useState('board');
  const { data } = useSWR<IGet>(type && `/api/user/${user_id}/${type}s`);
  return (
    <Cont>
      <BtnWrap username={username} type={type} setType={setType} />
      {type === 'board' && <BoardList boards={data?.boards!} size={4} />}
      {type === 'post' && <PostList from={8} posts={data?.posts!} size={4} />}
      {type === 'review' && <ReviewList reviews={data?.reviews!} />}
      {type === 'like' && <LikesList data={data!} username={username} />}
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
