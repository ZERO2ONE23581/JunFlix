import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { ITheme } from '../../../../styles/theme';
import { IBoardType } from '../../../types/board';
import { BoardTitle } from './box_title';
import { BoardHost } from './board_host';
import { BoardDetail } from './board_detail';
import { BoardFollow } from './board_follow';
import { TrimText } from '../../../Tools/trimText';

interface IBoardBox extends ITheme {
  board: IBoardType;
  onClick: (type: string) => void;
}
export const BoardBox = ({ theme, board, onClick }: IBoardBox) => {
  const user = board?.host;
  const host = { userId: user?.userId!, avatar: user?.avatar! };
  const details = { isPrivate: board?.isPrivate!, genre: board?.genre! };
  return (
    <Box className="board-box">
      <BoardTitle theme={theme} onClick={onClick} title={board?.title} />
      <BoardHost theme={theme} onClick={onClick} data={{ ...host }} />
      <BoardDetail theme={theme} data={{ ...details }} />
      <BoardFollow theme={theme} board_Id={board?.id} />
      <TrimText text={board?.description} max={200} />
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
