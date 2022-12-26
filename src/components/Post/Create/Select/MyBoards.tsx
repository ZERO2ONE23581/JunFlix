import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { select_board_ul_var } from '../../../../../styles/post';
import { useGetBoards } from '../../../../libs/client/useBoards';
import { useCapLetters } from '../../../../libs/client/useTools';

interface IBoardsList {
  _data: {
    theme: boolean;
    host_id: number;
    clickBoard: (id: number) => void;
  };
}
export const BoardsList = ({ _data }: IBoardsList) => {
  const theme = _data?.theme!;
  const clickBoard = _data?.clickBoard!;
  const { boards } = useGetBoards(_data?.host_id!);
  return (
    <>
      {boards?.map((board) => (
        <ListWrap
          custom={theme}
          key={board.id}
          animate="animate"
          whileHover="hover"
          variants={select_board_ul_var}
          onClick={() => clickBoard(board.id)}
        >
          <motion.li className="board_cover">
            <img src="/img/1.jpg" alt="board cover" />
          </motion.li>
          <motion.li className="board-title">
            <h2>{useCapLetters(board.title)}</h2>
            <span className="post-num">
              <span>{board?._count?.posts}</span>
              <span>Posts</span>
            </span>
          </motion.li>
        </ListWrap>
      ))}
    </>
  );
};
export const ListWrap = styled(motion.ul)`
  gap: 2rem;
  width: 100%;
  display: flex;
  padding: 2rem;
  cursor: pointer;
  border-radius: 10px;
  justify-content: center;
  align-items: flex-start;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  border: 2px solid ${(p) => p.theme.color.font};
  .board-title {
    gap: 5px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h2 {
      font-weight: 500;
    }
    .post-num {
      display: block;
      span {
        margin-right: 5px;
        font-style: italic;
      }
    }
  }
`;
