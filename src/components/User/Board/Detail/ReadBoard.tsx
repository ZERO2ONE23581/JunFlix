import styled from '@emotion/styled';
import useUser from '../../../../libs/client/useUser';
import { Profile } from './Profile';
import { TitleLayer } from './TitleLayer';
import { Description } from './Description';
import { PostList } from '../../Post/PostList';
import { FormCont, ModalClose } from '../../../../../styles/global';
import { IBoardWithAttrs } from '../../../../types/board';
import { CreatePost } from '../../Post/Create/CreatePost';
import { useState } from 'react';
import { BoardSetting } from './BoardSetting';

interface IBoardDetailProps {
  board?: IBoardWithAttrs;
}
export const ReadBoard = ({ board }: IBoardDetailProps) => {
  const { loggedInUser } = useUser();
  const isBoardHost = Boolean(loggedInUser?.id === board?.UserID);
  const [createPost, openCreatePost] = useState(false);
  const [editBoard, openEditBoard] = useState(false);
  const [deleteBoard, openDeleteBoard] = useState(false);
  const isPosts = Boolean(board?.posts?.length! > 0);
  return (
    <>
      <Cont>
        {isBoardHost && (
          <BoardSetting
            onEdit={openEditBoard}
            onDelete={openDeleteBoard}
            onCreate={openCreatePost}
          />
        )}
        <Board>
          <Profile board={board} />
          <Info>
            <TitleLayer board={board} />
            <Description board={board} />
          </Info>
        </Board>

        {isPosts ? (
          <PostList
            isHost={isBoardHost}
            BOARDID={board?.id!}
            USERID={board?.UserID!}
          />
        ) : (
          <>
            <h1>포스트가 아직 없습니다.</h1>
          </>
        )}
      </Cont>
      {createPost && isBoardHost && (
        <CreatePost board={board} openCreatePost={openCreatePost} />
      )}

      {/* {deletePost && (
        <DeletePost
          openCreatePost={openCreatePost}
          openDeletePost={openDeletePost}
        />
      )}
      {deleteBoard && <DeleteBoardModal closeModal={openDeleteBoard} />} */}
    </>
  );
};

const Cont = styled.section`
  position: relative;
  margin: 0 auto;
  min-width: 800px;
  max-width: 990px;
`;
const Board = styled(FormCont)`
  padding: 30px 10%;
  gap: 50px;
  display: flex;
  align-items: center;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
  .dim {
    opacity: 0.6;
    font-weight: 600;
  }
`;
const Info = styled.article`
  min-width: 60%;
`;
