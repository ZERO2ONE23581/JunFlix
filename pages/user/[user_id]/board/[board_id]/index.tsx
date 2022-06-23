import useSWR from 'swr';
import { useState } from 'react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { IGetBoard } from '../../../../../src/types/board';
import { Title } from '../../../../../src/components/Layout/Title';
import { ModalClose, PageWithBg } from '../../../../../styles/global';
import { PostList } from '../../../../../src/components/User/Post/PostList';
import { AvatarURL } from '../../../../../src/components/User/Avatar/URL';
import { BoardInfo } from '../../../../../src/components/User/Board/BoardInfo';
import { DeletePost } from '../../../../../src/components/User/Post/CloseModal';
import { DeleteBoardModal } from '../../../../../src/components/User/Board/DeleteModal';
import { CreatePost } from '../../../../../src/components/User/Post/Create/PostModal';
import { ReadPost } from '../../../../../src/components/User/Post/ReadPost';

const Board: NextPage = () => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const { data } = useSWR<IGetBoard>(
    user_id && board_id && `/api/user/${user_id}/board/${board_id}`
  );
  const avatar = AvatarURL(data?.board?.avatar);
  const [deleteBoard, openDeleteBoard] = useState(false);
  const [createPost, openCreatePost] = useState(false);
  const [deletePost, openDeletePost] = useState(false);
  const closeModal = () => {
    openDeleteBoard(false);
  };
  const BoardHost = data?.board?.user?.username;
  const IsAnyPost = Boolean(data?.board?.posts.length! > 0);

  return (
    <>
      <Title title={`${BoardHost}님의 보드`} />
      <Cont bg={avatar} IsAnyPost={IsAnyPost}>
        <BoardInfo
          board={data?.board}
          openDeleteBoard={openDeleteBoard}
          createPost={createPost}
          openCreatePost={openCreatePost}
        />
        <PostList isBoardPosts hostName={BoardHost} />
      </Cont>

      {deleteBoard && <DeleteBoardModal closeModal={openDeleteBoard} />}
      {deleteBoard && <ModalClose onClick={closeModal} />}

      {createPost && <CreatePost openDeletePost={openDeletePost} />}
      {deletePost && (
        <DeletePost
          openCreatePost={openCreatePost}
          openDeletePost={openDeletePost}
        />
      )}
    </>
  );
};
export default Board;

const Cont = styled(PageWithBg)<{ IsAnyPost: boolean }>`
  padding: 3% 15%;
  height: ${(p) => p.IsAnyPost && '100%'};
`;
