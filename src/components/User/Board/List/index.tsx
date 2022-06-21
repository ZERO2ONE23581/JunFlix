import useSWR from 'swr';
import Link from 'next/link';
import styled from '@emotion/styled';
import { BoardListInfo } from './info';
import { BoardIconWrap } from '../IconWrap';
import useUser from '../../../../libs/client/useUser';
import { ThumnailAvatar } from '../../Avatar/Thumnail';
import { IBoardListProps, IGetBoards } from '../../../../types/board';
import {
  Grid,
  Info,
  ListCont,
  ThumnAvatarCont,
} from '../../../../../styles/global';

export const BoardList = ({
  isSelect,
  isMyBoards,
  isAllBoards,
}: IBoardListProps) => {
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
  const BoardLink = (userId: number, boardId: number) => {
    if (isSelect) return `/user/${userId}/board/${boardId}/post/create`;
    return `/user/${userId}/board/${boardId}`;
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
      <Grid>
        {boards?.map((board) => (
          <Board key={board.id}>
            <Link href={`${BoardLink(board.UserID, board.id)}`}>
              <a>
                <ThumnailAvatar isBoard url={board.avatar} />
              </a>
            </Link>
            <BoardIconWrap user_id={board.UserID} board_id={board.id} />
            <BoardListInfo board={board} />
          </Board>
        ))}
      </Grid>
    </Cont>
  );
};
const Cont = styled(ListCont)`
  .info {
    margin-bottom: 20px;
  }
`;
const Board = styled(ThumnAvatarCont)``;
