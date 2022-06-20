import useSWR from 'swr';
import Link from 'next/link';
import styled from '@emotion/styled';
import { IGetBoards } from '../../../types/board';
import { ThumnailAvatar } from '../Avatar/Thumnail';
import { IsBoardFollowed } from './Follow/IsBoardFollowed';
import { useRouter } from 'next/router';
import useUser from '../../../libs/client/useUser';

export interface IBoardListProps {
  isAllBoards?: boolean;
  isMyBoards?: boolean;
  isSelect?: boolean;
}
export const BoardList = ({
  isAllBoards,
  isMyBoards,
  isSelect,
}: IBoardListProps) => {
  const { isLoggedIn, loggedInUser } = useUser();
  const typeSelect = (type: string) => {
    if (type === 'data') {
      if (isAllBoards) return `/api/user/all/boards`;
      if (isLoggedIn && isMyBoards) return `/api/user/my/boards`;
    }
    if (type === 'title') {
      if (isAllBoards) return `All Boards`;
      if (isLoggedIn && isMyBoards) return `${loggedInUser}'s Boards`;
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
      <Grid>
        {boards?.map((board) => (
          <Board key={board.id}>
            <Link href={`${BoardLink(board.UserID, board.id)}`}>
              <a>
                <ThumnailAvatar isBoard url={board.avatar} />
              </a>
            </Link>
            <IsBoardFollowed user_id={board.UserID} board_id={board.id} />
            <BoardInfo>
              <li>
                <span className="title">{board.title.toUpperCase()}</span>
              </li>
              <li>
                <span>Genre:</span>
                <span>{board.genre}</span>
              </li>
              <li>
                <span>Made by </span>
                <span>{board.user.username}</span>
              </li>
            </BoardInfo>
          </Board>
        ))}
      </Grid>
    </Cont>
  );
};
const Cont = styled.section`
  h1 {
    margin: 20px;
    font-weight: 700;
    font-size: 1.4rem;
    margin-left: 20px;
    color: ${(p) => p.theme.color.logo};
  }
`;
const Grid = styled.article`
  gap: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;
const Board = styled.article`
  overflow: hidden;
  border-radius: 5px;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
`;
const BoardInfo = styled.ul`
  padding: 15px 20px;
  li {
    margin-bottom: 3px;
    padding-bottom: 5px;
    border-bottom: 1px dotted ${(p) => p.theme.color.font};
    span {
      font-size: 1rem;
      margin-right: 5px;
    }
    .title {
      font-weight: 600;
      font-size: 1.1rem;
    }
  }
`;
