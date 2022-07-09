import styled from '@emotion/styled';
import { Board, Post } from '@prisma/client';
import { useRouter } from 'next/router';
import { Svg } from '../../Style/Svg/Svg';
import { Setting } from '../Create/Setting';
import { Dispatch, SetStateAction } from 'react';
import { PostModel } from '../../../types/post';
import { IconBtn } from '../../Style/Button/IconBtn';

interface ITitleProps {
  post: PostModel;
  isPostHost: boolean;
  setReadPost: Dispatch<SetStateAction<boolean>>;
  setEditPost: Dispatch<SetStateAction<boolean>>;
  setDeletePost: Dispatch<SetStateAction<boolean>>;
}
export const TopLayer = ({
  post,
  isPostHost,
  setReadPost,
  setEditPost,
  setDeletePost,
}: ITitleProps) => {
  return (
    <Cont>
      <BoardTitle>{post?.title.toUpperCase()}</BoardTitle>
      {isPostHost && (
        <Setting
          post={post}
          setReadPost={setReadPost}
          setEditPost={setEditPost}
          setDeletePost={setDeletePost}
        />
      )}
    </Cont>
  );
};
const Cont = styled.article`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 20px;
  border-bottom: ${(p) => p.theme.border.thin};
`;
const BoardTitle = styled.h1`
  font-weight: 400;
  font-size: 1.5em;
  line-height: 1.2em;
`;
