import useSWR from 'swr';
import styled from '@emotion/styled';
import { BoardWithUser, IGetBoards } from '../../../types/board';
import { BoardList } from '../../Board/Read/BoardList';
import { Btn } from '../../Style/Button';
import { useState } from 'react';
import { PostList } from '../../Post/Read/PostList';
import { ReviewList } from '../../Review/Read/ReviewList';
import { Post } from '@prisma/client';
import { LikesWithPost, LikesWithReview } from '../../../types/likes';
import { ReviewWithUser } from '../../../types/review';

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
  };
  const { data } = useSWR<IGet>(GetAPI(type));
  const SelectType = (type: string) => setType(type);
  return (
    <Cont>
      <BtnWrap>
        <Btn
          type="button"
          name="My Boards"
          onClick={() => SelectType('board')}
        />
        <Btn type="button" name="My Posts" onClick={() => SelectType('post')} />
        <Btn
          type="button"
          name="My Reviews"
          onClick={() => SelectType('review')}
        />
        <Btn
          type="button"
          name="My Likes"
          onClick={() => SelectType('likes')}
        />
      </BtnWrap>
      <>
        {type === 'board' && <BoardList boards={data?.boards!} />}
        {type === 'post' && <PostList posts={data?.posts!} />}
        {type === 'review' && <ReviewList reviews={data?.reviews!} />}
        {/* {isLikes && <BoardList boards={data?.boards!} />} */}
      </>
    </Cont>
  );
};
const Cont = styled.article`
  margin: 3rem auto;
  border: 5px solid hotpink;
  .review-list {
    min-width: auto;
  }
`;
const Board = styled.article`
  border: 3px solid pink;
`;
const BtnWrap = styled.div`
  border: 2px solid blue;
  gap: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  button {
    width: 125px;
    border-radius: 8px;
    color: ${(p) => p.theme.color.font};
    border: 3px solid ${(p) => p.theme.color.font};
    background-color: ${(p) => p.theme.color.bg};
  }
`;
