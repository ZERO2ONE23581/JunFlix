import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Flex } from '../../../../../styles/global';
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
  const { boards } = useGetBoards(user_id);
  const { theme, clickBoard: onClick } = _data;
  return (
    <Cont className="wrap">
      {boards?.map((board) => (
        <Wrap
          key={board.id}
          className="list-btn"
          onClick={() => onClick(board.id)}
        >
          <button type="submit">
            <Lists
              custom={theme}
              animate="animate"
              whileHover="hover"
              variants={select_board_ul_var}
            >
              <Cover>
                <img
                  className="cover-img"
                  src="/img/home-bg-dn.jpg"
                  alt="board cover"
                />
              </Cover>

              <Info>
                <h2>{useCapLetters(board.title)}</h2>
                <span className="counts">
                  <span>{board?._count?.posts}</span>
                  <span>Posts</span>
                </span>
              </Info>
            </Lists>
          </button>
        </Wrap>
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
const Wrap = styled(Flex)`
  width: 100%;
  cursor: pointer;
  justify-content: flex-start;
  button {
    width: 100%;
    border: none;
    outline: none;
    background-color: inherit;
  }
`;
const Lists = styled(motion.ul)`
  width: 100%;
  gap: 1.5rem;
  display: flex;
  border-radius: 5px;
  padding: 0.5rem 2rem;
  justify-content: flex-start;
  border: 1px solid #636e72;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
`;
const Cover = styled.li`
  padding: 0;
  .cover-img {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 5px;
  }
`;
const Info = styled.li`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
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
