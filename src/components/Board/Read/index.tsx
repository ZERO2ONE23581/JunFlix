import useSWR from 'swr';
import styled from '@emotion/styled';
import { EditInfo } from '../Edit/Info';
import { Info } from './Page/Board/Info';
import { IBoard } from '../../../types/board';
import { PostList } from '../../Post/Read/List';
import { Dispatch, SetStateAction } from 'react';
import { IGetAllPosts } from '../../../types/post';
import { Profile } from './Page/Board/Info/Profile';
import { Container } from '../../../../styles/global';

interface IReadBoard extends IBoard {
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
}
export const ReadBoard = ({ board, edit, setEdit }: IReadBoard) => {
  //
  const isPosts = Boolean(board?.posts?.length! > 0);
  const { data: post } = useSWR<IGetAllPosts>(
    board && `/api/user/${board?.UserID}/board/${board?.id}/post`
  );
  return (
    <>
      <Board>
        <Profile board={board} />
        {!edit && <Info board={board} />}
        {edit && <EditInfo board={board} setEdit={setEdit} />}
      </Board>

      {isPosts && <PostList posts={post?.posts!} />}
      {!isPosts && <h1>no post found</h1>}
    </>
  );
};
const Board = styled(Container)`
  gap: 30px;
  display: flex;
  margin-bottom: 20px;
  padding: 30px 100px;
  align-items: flex-start;
`;
