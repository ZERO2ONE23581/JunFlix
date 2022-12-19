import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { CreatePost } from '../../../../Post/Create';
import { PostSchema } from '../../../../Post/Schema';
import { NoData } from '../../../../../Tools/NoData';
import { BoardsGrid } from '../../../../Board/Read/Grid';
import { Dispatch, SetStateAction, useState } from 'react';
import { useUser } from '../../../../../libs/client/useUser';
import { useGetPosts } from '../../../../../libs/client/usePosts';
import { useGetBoards } from '../../../../../libs/client/useBoards';

interface IUserContent {
  _data: {
    theme: boolean;
    clicked: string;
    setFixed: Dispatch<SetStateAction<boolean>>;
  };
}
export const UserContent = ({ _data }: IUserContent) => {
  const router = useRouter();
  const { user_id } = useUser();
  const { theme, setFixed, clicked } = _data;
  const host_id = Number(router.query.user_id!);
  const isMy = Boolean(user_id === host_id);
  const [createPost, setCreatePost] = useState(false);
  const closeModal = () => {
    setFixed(false);
    setCreatePost(false);
  };
  const { boards, isBoard, Saved, isSaved } = useGetBoards(host_id);
  const {
    QS,
    posts,
    likedPosts,
    noData: noPosts,
  } = useGetPosts({
    host_id,
    board_id: 0,
  });
  const noBoards = !Boolean(boards?.length! > 0);
  const noLikes = !Boolean(likedPosts?.length! > 0);
  return (
    <Cont>
      {clicked === 'posts' && (
        <>
          {!noPosts && (
            <PostSchema setFixed={setFixed} _data={{ grid: 5, theme, posts }} />
          )}
          {noPosts && (
            <>
              <NoData
                _data={{
                  theme,
                  isMy,
                  type: 'post',
                  onClick: () => setCreatePost(true),
                }}
              />
              <CreatePost _data={{ theme, createPost, closeModal, setFixed }} />
            </>
          )}
        </>
      )}
      {clicked === 'likes' && (
        <>
          {!noLikes && (
            <PostSchema
              setFixed={setFixed}
              _data={{ grid: 5, theme, posts: likedPosts! }}
            />
          )}
          {noLikes && (
            <NoData
              _data={{
                isMy,
                theme,
                type: 'likes',
                onClick: () => router.push(`/post/all`),
              }}
            />
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

const Cont = styled.article`
  border: 2px solid red;
  min-height: 50vh;
  padding: 1rem 10rem;
  .boards_grid {
    margin-top: 2.2rem;
    .icons {
      z-index: 1;
      margin-top: 0.7rem;
    }
    //border: 2px solid red;
  }
`;
