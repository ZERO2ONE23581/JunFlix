import { BoardBox } from './Board';
import styled from '@emotion/styled';
import { IBoardList } from '../../../../types/board';
import { Grid } from '../../../../../styles/global';
import { NoData } from '../../../../Tools/NoData';

export const BoardList = ({ size, boards }: IBoardList) => {
  const isBoard = Boolean(boards?.length > 0);
  return (
    <>
      {isBoard && (
        <Cont size={size} className="board-list">
          {boards.slice(0, 6)?.map((board) => (
            <BoardBox
              key={board.id}
              boardId={board.id}
              userId={board.UserID}
              title={board.title}
              genre={board.genre}
              avatar={board.avatar!}
              username={board.user.username!}
            />
          ))}
        </Cont>
      )}
      {!isBoard && <NoData type="board" />}
    </>
  );
};
const Cont = styled(Grid)``;
