import { BtnWrap } from './BtnWrap';
import styled from '@emotion/styled';
import { FollowCounts } from '../Follow/counts';
import { Dispatch, SetStateAction, useState } from 'react';
import { ProfileAvatar } from '../../Avatar/Profile';
import useUser from '../../../../libs/client/useUser';
import { Profile } from './Profile';
import { TitleLayer } from './TitleLayer';
import { Description } from './Description';
import { SettingBtn } from './SettingBtn';
import { PostList } from '../../Post/PostList';
import { FormCont, ModalClose } from '../../../../../styles/global';
import { IBoardWithAttrs } from '../../../../types/board';
import { CreatePost } from '../../Post/Create/CreatePost';

interface IBoardDetailProps {
  board?: IBoardWithAttrs;
}
export const BoardInfo = ({ board }: IBoardDetailProps) => {
  const { loggedInUser } = useUser();
  const isBoardHost = Boolean(loggedInUser?.id === board?.UserID);
  const [editBoard, openEditBoard] = useState(false);
  const [deleteBoard, openDeleteBoard] = useState(false);
  const [createPost, openCreatePost] = useState(false);
  const [setting, openSetting] = useState(false);
  return (
    <>
      <Cont>
        <Board>
          <Profile board={board} />
          <Info>
            <TitleLayer board={board} />
            <Description board={board} />
          </Info>
        </Board>
        {isBoardHost && (
          <SettingBtn
            setting={setting}
            openSetting={openSetting}
            onEdit={openEditBoard}
            onDelete={openDeleteBoard}
            onCreate={openCreatePost}
          />
        )}
        <PostList USERID={board?.UserID!} BOARDID={board?.id!} />
      </Cont>
      {createPost && isBoardHost && (
        <CreatePost board={board} closeModal={openCreatePost} />
      )}
      {setting && <ModalClose onClick={() => openSetting(false)} />}

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
  border: 10px solid whitesmoke;
`;
const Board = styled(FormCont)`
  padding: 30px 10%;
  gap: 50px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
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
