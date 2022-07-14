import useSWR from 'swr';
import styled from '@emotion/styled';
import { EditInfo } from '../Edit/Info';
import { Info } from './Page/Board/Info';
import { IBoard } from '../../../types/board';
import { BtnWrap } from './Page/Board/BtnWrap';
import { PostList } from '../../Post/Read/List';
import { Dispatch, SetStateAction } from 'react';
import { IGetAllPosts } from '../../../types/post';
import { Profile } from './Page/Board/Info/Profile';
import { Container, DimBackground } from '../../../../styles/global';

interface IReadBoard extends IBoard {
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setPreview: Dispatch<SetStateAction<string>>;
}
export const ReadBoard = ({ board, edit, setEdit, setPreview }: IReadBoard) => {
  const isPosts = Boolean(board?.posts?.length! > 0);
  const { data: post } = useSWR<IGetAllPosts>(
    board && `/api/user/${board?.UserID}/board/${board?.id}/post`
  );
  return (
    <>
      <Board>
        <Profile board={board} />
        {!edit && <Info board={board} />}
        {edit && (
          <>
            <EditInfo board={board} setEdit={setEdit} />
          </>
        )}
        <BtnWrap setPreview={setPreview} edit={edit} setEdit={setEdit} />
      </Board>
      {edit && <DimBackground zIndex={1} />}
      {isPosts && <PostList posts={post?.posts!} />}
      {!isPosts && <h1>no post found</h1>}
    </>
  );
};
const Board = styled(Container)`
  z-index: 2;
  position: relative;
  padding: 30px 100px;
  margin-bottom: 20px;
  gap: 30px;
  display: flex;
  align-items: flex-start;
`;
