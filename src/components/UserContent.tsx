import { useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { PostSchema } from './Post/Schema/PostSchema';
import { NoData } from '../Tools/NoData';
import { CreatePost } from './Post/Create/CreatePost';
import { BoardsGrid } from './BoardsGrid';
import { useUser } from '../libs/client/useUser';
import { useGetPosts } from '../libs/client/usePosts';
import { useGetBoards } from '../libs/client/useBoards';
import { useResponsive } from '../libs/client/useTools';

interface IUserContent {
  _data: {
    theme: boolean;
    clicked: string;
  };
}
export const UserContent = ({ _data }: IUserContent) => {
  const router = useRouter();
  const { user_id } = useUser();
  const { theme, clicked } = _data;
  const host_id = Number(router.query.user_id!);
  const isMy = Boolean(user_id === host_id);
  const [createPost, setCreatePost] = useState(false);
  const { boards, isBoard, Saved, isSaved } = useGetBoards(host_id);
  const {
    QS,
    posts,
    likedPosts,
    noData: noPosts,
  } = useGetPosts({ host_id, board_id: 0 });
  const noBoards = !Boolean(boards?.length! > 0);
  const noLikes = !Boolean(likedPosts?.length! > 0);
  const closeModal = () => {
    setCreatePost(false);
  };
  const onClick = () => setCreatePost(true);
  const allPosts = () => router.push(`/post/all`);
  const { isDesk } = useResponsive();
  return (
    <Cont isDesk={isDesk}>
      {clicked === 'posts' && (
        <>
          {!noPosts && <PostSchema _data={{ grid: 5, theme, posts }} />}
          {noPosts && (
            <>
              <NoData _data={{ theme, isMy, onClick, type: 'post' }} />
              <CreatePost _data={{ theme, createPost, closeModal }} />
            </>
          )}
        </>
      )}
      {clicked === 'likes' && (
        <>
          {!noLikes && (
            <PostSchema _data={{ grid: 5, theme, posts: likedPosts! }} />
          )}
          {noLikes && (
            <NoData _data={{ isMy, theme, type: 'likes', onClick: allPosts }} />
          )}
        </>
      )}
      {clicked === 'boards' && (
        <>
          {!noBoards && (
            <BoardsGrid
              _data={{
                theme,
                isBoard,
                boards,
                quickSaved: QS,
                user_id: host_id,
              }}
            />
          )}
          {noBoards && (
            <NoData
              _data={{
                theme,
                isMy,
                type: 'board',
                onClick: () => router.push(`/board/create`),
              }}
            />
          )}
        </>
      )}
      {clicked === 'saved' && (
        <>
          {isSaved && (
            <BoardsGrid _data={{ theme, isBoard: isSaved, boards: Saved! }} />
          )}
          {!isSaved && (
            <NoData
              _data={{
                isMy,
                theme,
                type: 'saved',
                onClick: () => router.push(`/board/all`),
              }}
            />
          )}
        </>
      )}
    </Cont>
  );
};
const Cont = styled.article<{ isDesk: boolean }>`
  min-height: ${(p) => (p.isDesk ? '50vh' : '100vh')};
  padding: ${(p) => (p.isDesk ? '1rem 10rem' : '2rem 1rem')};
`;
