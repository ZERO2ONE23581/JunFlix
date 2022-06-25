import { useState } from 'react';
import { Profile } from './Profile';
import { BtnWrap } from './BtnWrap';
import styled from '@emotion/styled';
import { TitleLayer } from './TitleLayer';
import { Description } from './Description';
import { PostList } from '../../Post/PostList';
import useUser from '../../../../libs/client/useUser';
import { IconBtn } from '../../../Style/Button/IconBtn';
import { IBoardWithAttrs } from '../../../../types/board';
import { CreatePost } from '../../Post/Create/CreatePost';
import { FormCont, ModalClose } from '../../../../../styles/global';
import { User } from '@prisma/client';

export interface IReadBoardProps {
  board?: IBoardWithAttrs;
  user?: User;
}
export const ReadBoard = ({ board }: IReadBoardProps) => {
  const { loggedInUser } = useUser();
  const isBoardHost = Boolean(loggedInUser?.id === board?.UserID);
  const [onSetting, setOnSetting] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [onDelete, setOnDelete] = useState(false);
  const [onCreate, setOnCreate] = useState(false);
  const isPosts = Boolean(board?.posts?.length! > 0);
  return (
    <>
      <Cont>
        <Board>
          {isBoardHost && (
            <Setting>
              <IconBtn
                type="button"
                svgType="setting"
                isClicked={onSetting}
                onClick={() => setOnSetting((p) => !p)}
              />
              {onSetting && (
                <>
                  <BtnWrap
                    setOnEdit={setOnEdit}
                    setOnDelete={setOnDelete}
                    setOnCreate={setOnCreate}
                    setOnSetting={setOnSetting}
                  />
                  <ModalClose
                    zIndex={200}
                    onClick={() => setOnSetting(false)}
                  />
                </>
              )}
            </Setting>
          )}
          <Profile board={board} />
          <Info>
            <TitleLayer board={board} user={loggedInUser} />
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
      {onCreate && <CreatePost board={board} openCreatePost={setOnCreate} />}

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
  gap: 50px;
  display: flex;
  padding: 30px 10%;
  position: relative;
  align-items: center;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
  .dim {
    opacity: 0.6;
    font-weight: 600;
  }
`;
const Setting = styled.article`
  top: 15%;
  right: 10%;
  position: absolute;
  button {
    z-index: 999;
  }
`;
const Info = styled.article`
  min-width: 60%;
`;
