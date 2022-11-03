import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useUser } from '../../../../libs/client/useUser';
import { select_board_ul_var } from '../../../../../styles/post';
import { useGetBoards } from '../../../../libs/client/useBoards';
import { useCapLetters } from '../../../../libs/client/useTools';

interface IBoardsList {
  _data: {
    theme: boolean;
    clickBoard: (id: number) => void;
  };
}
export const BoardsList = ({ _data }: IBoardsList) => {
  const { user_id } = useUser();
  const { theme, clickBoard: onClick } = _data;
  const { boards } = useGetBoards(user_id);
  return (
    <Cont className="wrap">
      {boards?.map((board) => (
        <Btn
          key={board.id}
          type="submit"
          className="list-btn"
          onClick={() => onClick(board.id)}
        >
          <motion.ul
            custom={theme}
            animate="animate"
            whileHover="hover"
            className="list-wrap"
            variants={select_board_ul_var}
          >
            <Cover className="cover">
              <img
                className="cover-img"
                src="/img/home-bg-dn.jpg"
                alt="board cover"
              />
            </Cover>

            <Info className="info">
              <h2>{useCapLetters(board.title)}</h2>
              <span className="counts">
                <span>{board?._count?.posts}</span>
                <span>Posts</span>
              </span>
            </Info>
          </motion.ul>
        </Btn>
      ))}
    </Cont>
  );
};

const Cont = styled.div`
  width: 100%;
  max-height: 55vh;
  overflow-y: auto;
  padding-bottom: 1rem;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Btn = styled.button`
  width: 100%;
  padding: 0;
  margin: none;
  border: none;
  display: block;
  cursor: pointer;
  .list-wrap {
    gap: 1.5rem;
    display: flex;
    padding: 0.5rem 2rem;
    justify-content: flex-start;
    box-shadow: ${(p) => p.theme.boxShadow.nav};
  }
`;
const Cover = styled.li`
  padding: 0;
  .cover-img {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 10px;
  }
`;
const Info = styled.li`
  display: flex;
  height: fit-content;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  h2 {
    font-weight: 500;
    font-size: 1.3rem;
  }
  .counts {
    font-size: 1rem;
    span {
      margin-right: 5px;
      font-style: italic;
    }
  }
`;
