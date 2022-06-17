import useSWR from 'swr';
import Link from 'next/link';
import styled from '@emotion/styled';
import { IGetBoards } from '../../../types/board';
import { ThumnailAvatar } from '../Avatar/ThumnailAvatar';
import { FollowBoard } from './Follow/FollowBoard';
import useUser from '../../../libs/client/useUser';
import { IsBoardFollowed } from './Follow/IsBoardFollowed';

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
    <>
      <h1>All Boards</h1>
      <Grid>
        {boards?.map((board) => (
          <article key={board.id}>
            <Item>
              <Link href={`${BoardLink(board.UserID, board.id)}`}>
                <a>
                  <ThumnailAvatar isBoard url={board.avatar} />
                </a>
              </Link>
              <IsBoardFollowed user_id={board.UserID} board_id={board.id} />
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
          </article>
        ))}
      </Grid>
    </>
  );
};
const Grid = styled.article`
  gap: 20px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;
const Item = styled.div`
  position: relative;
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
