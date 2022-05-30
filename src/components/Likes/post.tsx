import styled from '@emotion/styled';
import { Post, User } from '@prisma/client';
import { useState } from 'react';
import useSWR from 'swr';
import { Icons } from '../../../styles/svg';
import useMutation from '../../libs/client/useMutation';

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
  const queryData = Boolean(userId && boardId && postId);
  const { data: PostData, mutate: PostMutate } = useSWR<IGetPost>(
    queryData && `/api/user/${userId}/board/${boardId}/post/${postId}`
  );
  const likesCount = PostData?.post?._count.likes;
  const [createLikes] = useMutation(
    `/api/user/${userId}/board/${boardId}/post/${postId}/likes/create`
  );
  const [comments, setComments] = useState(false);
  const handleClick = (type: string) => {
    if (!PostData) return;
    PostMutate(
      {
        ...PostData,
        isLiked: !PostData.isLiked,
        post: {
          ...PostData.post,
          _count: {
            ...PostData.post._count,
            likes: PostData.isLiked
              ? PostData.post._count.likes - 1
              : PostData.post._count.likes + 1,
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
          {!PostData?.isLiked ? (
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
