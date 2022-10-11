import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { ITheme } from '../../../../styles/theme';
import { IBoardType } from '../../../types/board';
import { TrimText } from '../../../Tools/trimText';
import { BoardTitle } from './box_title';
import { BoardHost } from './board_host';
import { BoardDetail } from './board_detail';

interface IBoardBox extends ITheme {
  board: IBoardType;
  onClick: (type: string) => void;
}
export const BoardBox = ({ theme, board, onClick }: IBoardBox) => {
  const user = board?.user!;
  const host = { userId: user.userId!, avatar: user.avatar! };
  const details = { isPrivate: board.isPrivate!, genre: board.genre! };
  return (
    <Box className="board-box">
      <BoardTitle theme={theme} onClick={onClick} title={board.title} />
      <BoardHost theme={theme} onClick={onClick} data={{ ...host }} />
      <BoardDetail theme={theme} data={{ ...details }} />
      <TrimText text={board.description} max={200} />
    </Box>
  );
};
const Box = styled(motion.article)`
  gap: 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
const Title = styled.div`
  position: relative;
  gap: 10px;
  display: flex;
  align-items: flex-end;
  h1 {
    font-size: 2.7rem;
  }
  .more {
    z-index: 2;
  }
`;
const Host = styled.div`
  gap: 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  > span {
    opacity: 0.8;
    font-size: 0.9rem;
  }
`;
const Detail = styled.div`
  opacity: 0.9;
  ul {
    gap: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    li {
      gap: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
