import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { BoardTitle } from './box_title';
import { BoardHost } from './board_host';
import { Btn } from '../../../Tools/Button';
import { BoardDetail } from './board_detail';
import { ITheme } from '../../../../styles/theme';
import { IBoardType } from '../../../types/board';
import { TrimText } from '../../../Tools/trimText';
import useUser from '../../../libs/client/useUser';

interface IBoardBox extends ITheme {
  board: IBoardType;
  onClick: (type: string) => void;
  follow: {
    btnName?: string;
    isFollowing?: boolean;
    clickFollow: () => void;
  };
}
export const BoardBox = ({ theme, board, onClick, follow }: IBoardBox) => {
  const user = board?.host;
  const { loggedInUser } = useUser();
  const title = {
    title: board?.title,
    board_id: board?.id,
    host_id: board.host_id,
  };
  const btnName = follow.btnName;
  const isFollowing = follow.isFollowing;
  const clickFollow = follow.clickFollow;
  const host = { userId: user?.userId!, avatar: user?.avatar! };
  const isMyBoard = Boolean(loggedInUser?.id === board.host_id);
  const details = { isPrivate: board?.isPrivate!, genre: board?.genre! };
  //
  return (
    <Box className="board-box">
      <BoardTitle theme={theme} onClick={onClick} data={{ ...title }} />
      <BoardHost theme={theme} onClick={onClick} data={{ ...host }} />
      <BoardDetail theme={theme} data={{ ...details }} />
      {!isMyBoard && (
        <Btn
          type="button"
          onClick={clickFollow}
          isBoolean={{ theme, isFollowing }}
          isString={{ btnName, className: 'follow-btn' }}
        />
      )}
      <TrimText text={board?.description} max={200} />
    </Box>
  );
};
const Box = styled(motion.article)`
  .follow-btn {
    width: fit-content;
    padding: 5px 20px;
    font-size: 1.1rem;
  }
  gap: 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: fit-content;
  border: 2px solid yellow;
`;
