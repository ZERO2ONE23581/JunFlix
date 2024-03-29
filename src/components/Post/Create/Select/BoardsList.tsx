import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { selectVars } from '../../../../../styles/post';
import { useGetBoards } from '../../../../libs/client/useBoards';
import { UseCapLetters } from '../../../../libs/client/useTools';

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
          variants={selectVars}
          onClick={() => clickBoard(board.id)}
        >
          <motion.li className="board_cover">
            <img src="/img/home-bg-dn.jpg" alt="board cover" />
          </motion.li>
          <motion.li className="board-title">
            <h2>{UseCapLetters(board.title)}</h2>
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
  gap: 15px;
  width: 100%;
  width: 100%;
  display: flex;
  padding: 15px;
  cursor: pointer;
  border-radius: 10px;
  justify-content: center;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  .board_cover {
    padding: 0;
    width: fit-content;
    img {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 10px;
    }
  }
  .board-title {
    gap: 5px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h2 {
      font-weight: 500;
      font-size: 1.4rem;
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
