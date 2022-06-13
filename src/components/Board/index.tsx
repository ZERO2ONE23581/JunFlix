import { useState } from 'react';
import { BtnWrap } from './Button';
import { BoardForm } from './Form';
import styled from '@emotion/styled';
import { PostList } from '../Post/List';
import { FollowBoard } from '../Follow/board';

export const BoardInfo = ({ board, setDelModal, isOwner }: any) => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <>
      <Board>
        <article className="h1-follow-wrap">
          <h1>{board?.user?.username}'s board</h1>
          <FollowBoard isOwner={isOwner} />
        </article>
        <BtnWrap
          board={board}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setDelModal={setDelModal}
        />
        <BoardForm board={board} isEdit={isEdit} />
        <PostList posts={board?.posts} />
      </Board>
    </>
  );
};
const Board = styled.article`
  width: 50%;
  padding: 20px 40px;
  top: 70%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
  .h1-follow-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1 {
      font-size: 2rem;
      font-weight: 700;
    }
  }
`;
