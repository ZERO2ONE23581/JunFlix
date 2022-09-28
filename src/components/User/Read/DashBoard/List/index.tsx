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
import { Slider } from '../../../../Tools/Slider';

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
  const { data } = useSWR<IGet>(
    user_id && type && `/api/user/${user_id}/${type}s`
  );
  return (
    <Cont>
      <BtnWrap username={username} type={type} setType={setType} />
      {type === 'board' && <Slider type="board" boardType="my" />}
      {type === 'post' && <Slider type="post" boardType="my" />}
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
