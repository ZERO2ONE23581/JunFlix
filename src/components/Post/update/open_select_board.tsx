import useSWR from 'swr';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Svg } from '../../../Tools/Svg';
import { QuickSaved } from './quick_save';
import { useEffect, useState } from 'react';
import { IGetBoard } from '../../../types/board';
import { avatarLink } from '../../../Tools/Avatar';
import { useCapLetters } from '../../../libs/client/useTools';
import { border, color, TweenTrans } from '../../../../styles/variants';

interface IPostBoard {
  id: {
    host_id: number;
    board_id: number;
    chosen_board_id: number;
  };
  theme: boolean;
  open: () => void;
  selectQuck: boolean;
}
export const OpenSelectBoard = ({
  open,
  theme,
  id,
  selectQuck,
}: IPostBoard) => {
  const host_id = id?.host_id;
  const og_board_id = id?.board_id;
  const chosen_id = id?.chosen_board_id;
  const [board_ID, setBoard_ID] = useState(0);
  const { data } = useSWR<IGetBoard>(
    Boolean(board_ID) && ` /api/board/${board_ID}`
  );
  const board = data?.board;
  const counts = board?._count?.posts;
  const title = useCapLetters(board?.title!);

  useEffect(() => {
    if (!og_board_id) {
      if (chosen_id) setBoard_ID(chosen_id);
      else setBoard_ID(0);
    }
    if (og_board_id) {
      if (selectQuck) setBoard_ID(0);
      else if (chosen_id) setBoard_ID(chosen_id);
      else setBoard_ID(og_board_id);
    }
  }, [chosen_id, selectQuck, og_board_id, setBoard_ID, board]);
  return (
    <>
      <>
        {board && (
          <Container
            onClick={open}
            initial="initial"
            animate="animate"
            whileHover={'hover'}
            transition={TweenTrans}
            variants={openSelectVar}
            custom={{ theme, chosen: Boolean(chosen_id) }}
          >
            <motion.span
              custom={theme}
              animate="animate"
              variants={label_var}
              className="label-span"
            >
              Board
            </motion.span>
            <li className="cover">
              <img src={avatarLink(board?.cover)} alt="board cover" />
            </li>
            <Wrap className="wrap">
              <span className="title">
                <span>{title}</span>
                <span className="counts">
                  <span>{counts ? counts : 0}</span>
                  <span>{counts! > 1 ? 'posts' : 'post'}</span>
                </span>
              </span>
              <span>
                <Svg type="right-chev" theme={theme} />
              </span>
            </Wrap>
          </Container>
        )}
        {!board && (
          <QuickSaved
            theme={theme}
            openModal={open}
            host_id={host_id}
            chosen_id={chosen_id}
          />
        )}
      </>
    </>
  );
};
export const Container = styled(motion.ul)`
  gap: 20px;
  width: 96%;
  display: flex;
  cursor: pointer;
  padding: 15px 30px;
  border-radius: 5px;
  align-items: center;
  margin: 0 auto;
  .label-span {
    top: 0.4rem;
    left: 3rem;
    position: absolute;
    padding: 1px 10px;
    border-radius: 20px;
  }
  .cover {
    width: fit-content;
    img {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 5px;
    }
  }
`;
export const Wrap = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    font-size: 1.2rem;
  }
  .counts {
    display: block;
    margin-top: 2px;
    font-size: 1rem;
    span {
      margin-right: 5px;
      font-style: italic;
    }
  }
`;
export const openSelectVar = {
  hover: () => ({
    color: 'rgba(255,255,255)',
    backgroundColor: '#E50914',
  }),
  animate: ({ theme, chosen }: any) => ({
    transition: { duration: 0.3 },
    color: chosen ? '#E50914' : color(theme),
    border: chosen ? '2px solid #E50914' : border(theme),
  }),
};
export const label_var = {
  animate: (theme: boolean) => ({
    opacity: 1,
    color: '#E50914',
    backgroundColor: color(!theme),
    transition: { duration: 0.3 },
  }),
};
