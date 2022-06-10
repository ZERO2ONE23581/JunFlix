import useSWR from 'swr';
import Link from 'next/link';
import styled from '@emotion/styled';
import { IGetBoards } from '../../../types/board';
import { BoardAvatar } from '../../Avatar/\bBoard/Thumnail';

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
  const { data } = useSWR<IGetBoards>(
    isAllBoards ? `/api/all/boards` : isMyBoards ? `/api/my/boards` : null
  );
  const boards = data?.boards;
  const BoardLink = (userId: number, boardId: number) => {
    if (isSelect) return `/user/${userId}/board/${boardId}/post/create`;
    return `/user/${userId}/board/${boardId}`;
  };
  return (
    <Grid>
      {boards?.map((board) => (
        <Link key={board.id} href={`${BoardLink(board.UserID, board.id)}`}>
          <a>
            <Item>
              <BoardAvatar url={board.avatar} />
              <ul>
                <li>
                  <span>Title: </span>
                  <span> {board.title.toUpperCase()}</span>
                </li>
                <li>
                  <span>Genre: </span>
                  <span> {board.genre}</span>
                </li>
                <li>
                  <span>Made by: </span>
                  <span> {board.user.username}</span>
                </li>
              </ul>
            </Item>
          </a>
        </Link>
      ))}
    </Grid>
  );
};
const Grid = styled.article`
  gap: 15px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;
const Item = styled.div`
  border-radius: 5px;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  ul {
    padding: 8px 20px;
    li {
      border-bottom: 1px dotted ${(p) => p.theme.color.font};
      padding-bottom: 2px;
      margin-bottom: 4px;
      span {
        font-size: 1rem;
      }
    }
  }
`;
