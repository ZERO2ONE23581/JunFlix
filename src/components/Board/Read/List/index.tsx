import Link from 'next/link';
import { Item } from './Item';
import styled from '@emotion/styled';
import { IBoardList } from '../../../../types/board';
import { Grid } from '../../../../../styles/global';

export const BoardList = ({ size, boards }: IBoardList) => {
  const isBoard = Boolean(boards?.length > 0);
  return (
    <>
      {isBoard && (
        <Cont size={size} className="board-list">
          {boards?.map((board) => (
            <Link
              key={board.id}
              href={`/user/${board.UserID}/board/${board.id}/${board.title}`}
            >
              <a>
                <Item
                  boardId={board.id}
                  userId={board.UserID}
                  title={board.title}
                  genre={board.genre}
                  avatar={board.avatar!}
                  username={board.user.username!}
                />
              </a>
            </Link>
          ))}
        </Cont>
      )}
      {!isBoard && <h1>NO BOARD FOUND.</h1>}
    </>
  );
};
const Cont = styled(Grid)``;
