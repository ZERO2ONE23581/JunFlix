import useSWR from 'swr';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { ListInfo } from './info/ListInfo';
import { IsOwner } from '../../../IsOwner';
import useUser from '../../../../libs/client/useUser';
import { WithAvatar } from '../../Post/Create/AvatarInput';
import { Grid, Info, ListCont } from '../../../../../styles/global';
import { IBoardListProps, IGetBoards } from '../../../../types/board';

export const BoardList = ({
  isSelect,
  isMyBoards,
  isAllBoards,
}: IBoardListProps) => {
  const router = useRouter();
  const { isLoggedIn, loggedInUser } = useUser();
  const typeSelect = (type: string) => {
    if (type === 'data') {
      if (isAllBoards) return `/api/user/all/boards`;
      if (isLoggedIn && (isMyBoards || isSelect)) return `/api/user/my/boards`;
    }
    if (type === 'title') {
      if (isAllBoards) return `All Boards`;
      if (isLoggedIn && isMyBoards) return `${loggedInUser?.username}'s Boards`;
    }
  };
  const { data } = useSWR<IGetBoards>(typeSelect('data'));
  const boards = data?.boards;
  const clickBoard = (userId: number, boardId: number, title: string) => {
    if (isAllBoards || isMyBoards)
      return router.push(`/user/${userId}/board/${boardId}/${title}`);
    if (isSelect)
      return router.push(`/user/${userId}/board/${boardId}/post/create`);
  };

  return (
    <Cont>
      <h1>{typeSelect('title')}</h1>
      {isSelect && (
        <Info className="info">
          <span>* Please select the board to create post.</span>
          <span>* 게시물을 만들 회원님의 보드를 선택해주세요.</span>
        </Info>
      )}
      <Grid size={4}>
        {boards?.map((board) => (
          <Board key={board.id} avatar={board.avatar}>
            <Button
              onClick={() => clickBoard(board.UserID, board.id, board.title)}
            />
            <ListInfo board={board} />
            <IsOwner USERID={board.UserID} />
          </Board>
        ))}
      </Grid>
    </Cont>
  );
};
const Cont = styled(ListCont)`
  width: 100%;
  height: 100%;
`;
const Button = styled.button`
  border: none;
  width: 100%;
  height: 100%;
  background: none;
`;
const Board = styled(WithAvatar)`
  display: flex;
  justify-content: end;
  flex-direction: column;
  min-width: 200px;
  min-height: 350px;
  border-radius: 3px;
  .is-owner {
    svg {
      top: 5%;
      left: 5%;
    }
  }
`;
