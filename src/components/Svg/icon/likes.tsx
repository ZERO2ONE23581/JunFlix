import styled from '@emotion/styled';
import { Post } from '@prisma/client';
import { useState } from 'react';
import useSWR from 'swr';
import { Icons } from '../../../../styles/svg';
import useMutation from '../../../libs/client/useMutation';

interface IGetPost {
  post?: Post;
  ok: boolean;
  error?: string;
  isLiked?: boolean;
}

export const Likes = ({ userId, boardId, postId }: any) => {
  const { data: swrData, mutate } = useSWR<IGetPost>(
    `/api/user/${userId}/board/${boardId}/post/${postId}`
  );
  const [createLikes] = useMutation(
    `/api/user/${userId}/board/${boardId}/post/${postId}/likes/create`
  );
  const [comments, setComments] = useState(false);
  const handleClick = (type: string) => {
    if (!swrData) return;
    mutate((prev) => prev && { ...prev, isLiked: !swrData.isLiked }, false);
    if (type === 'comments') {
      setComments((p) => !p);
    }
    createLikes({});
  };
  //
  console.log(swrData?.isLiked);
  return (
    <>
      <BtnWrap>
        <Btn onClick={() => handleClick('likes')}>
          {!swrData?.isLiked ? (
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
    </>
  );
};
const Btn = styled.button`
  background-color: inherit;
  border: 1px solid blue;
`;
const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid red;
  width: 100px;
`;
