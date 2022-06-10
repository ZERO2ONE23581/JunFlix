import styled from '@emotion/styled';
import { useState } from 'react';
import { PostList } from '../Post/List';
import { BtnWrap } from './Button';
import { BoardForm } from './Form';

export const BoardInfo = ({ board, setDelModal }: any) => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <>
      <Board>
        <h1>{board?.user?.username}'s board</h1>
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
  padding: 20px;
  top: 70%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
  h1 {
    font-size: 2rem;
    font-weight: 700;
  }
`;
