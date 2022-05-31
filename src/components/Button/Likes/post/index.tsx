import styled from '@emotion/styled';
import { Post, User } from '@prisma/client';
import { useState } from 'react';
import useSWR from 'swr';
import { Icons } from '../../../../../styles/svg';
import useMutation from '../../../../libs/client/useMutation';

interface IGetPost {
  ok: boolean;
  error?: string;
  isLiked?: boolean;
  post: PostWithUser;
}
interface PostWithUser extends Post {
  user: User;
  _count: {
    likes: number;
  };
}

export const PostLikes = ({ userId, boardId, postId }: any) => {
  const isQueryId = Boolean(userId && boardId && postId);
  const [comments, setComments] = useState(false);
  //
  const { data, mutate } = useSWR<IGetPost>(
    isQueryId && `/api/user/${userId}/board/${boardId}/post/${postId}`
  );
  const likesCount = data?.post?._count.likes;
  const [createLikes] = useMutation(
    `/api/user/${userId}/board/${boardId}/post/${postId}/likes/create`
  );
  //
  const handleClick = (type: string) => {
    if (!data) return;
    mutate(
      {
        ...data,
        isLiked: !data.isLiked,
        post: {
          ...data.post,
          _count: {
            ...data.post._count,
            likes: data.isLiked
              ? data.post._count.likes - 1
              : data.post._count.likes + 1,
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
          {!data?.isLiked ? (
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
const Counts = styled.span`
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
