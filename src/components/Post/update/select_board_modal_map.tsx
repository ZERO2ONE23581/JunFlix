import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useCapLetters } from '../../../libs/client/useTools';
import { useGetMyBoards } from '../../../libs/client/useBoards';
import { Map, select_board_ul_var } from '../../../../styles/post';
import { useGetQuickSavedPost } from '../../../libs/client/usePosts';

interface IBoardMap {
  theme: boolean;
  host_id: number;
  clickBoard: (id: number) => void;
  clickQuickSave: (id: number) => void;
}
export const BoardMap = ({
  theme,
  host_id,
  clickBoard,
  clickQuickSave,
}: IBoardMap) => {
  const boards = useGetMyBoards(host_id);
  const counts = useGetQuickSavedPost(host_id);
  return (
    <Container className="map">
      <motion.ul
        custom={!theme}
        animate="animate"
        whileHover="hover"
        onClick={() => clickQuickSave(0)}
        variants={select_board_ul_var}
      >
        <motion.li className="board-cover">
          <img src="/img/home-bg-dn.jpg" alt="board cover" />
        </motion.li>
        <motion.li className="board-title">
          <h2>Quick Save</h2>
          <span className="post-num">
            <span>{counts ? counts : 0}</span>
            <span>{counts! > 1 ? 'posts' : 'post'}</span>
          </span>
        </motion.li>
      </motion.ul>
      {boards?.map((board) => (
        <motion.ul
          custom={theme}
          key={board.id}
          animate="animate"
          whileHover="hover"
          onClick={() => clickBoard(board.id)}
          variants={select_board_ul_var}
        >
          <motion.li className="board-cover">
            <img src="/img/home-bg-dn.jpg" alt="board cover" />
          </motion.li>
          <motion.li className="board-title">
            <h2>{useCapLetters(board.title)}</h2>
            <span className="post-num">
              <span>{board?._count?.posts}</span>
              <span>Posts</span>
            </span>
          </motion.li>
        </motion.ul>
      ))}
    </Container>
  );
};
const Container = styled(Map)``;
