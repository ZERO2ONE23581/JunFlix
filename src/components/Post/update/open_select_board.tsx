import useSWR from 'swr';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Svg } from '../../../Tools/Svg';
import { useEffect, useState } from 'react';
import { IGetBoard } from '../../../types/board';
import { avatarLink } from '../../../Tools/Avatar';
import { useCapLetters } from '../../../libs/client/useTools';
import {
  color,
  redBrdr,
  TransBorder,
  TweenTrans,
} from '../../../../styles/variants';
import { FlexCol } from '../../../../styles/global';

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
  const og_board_id = id?.board_id;
  const chosen_id = id?.chosen_board_id;
  const [board_ID, setBoard_ID] = useState(0);
  const { data } = useSWR<IGetBoard>(
    Boolean(board_ID) && ` /api/board/${board_ID}`
  );
  const board = data?.board;
  const counts = board?._count?.posts;
  const title = useCapLetters(board?.title!);
  const isSelected = Boolean(chosen_id);

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
      <Cont>
        <h3>Board</h3>
        <Lists
          onClick={open}
          animate="animate"
          whileHover={'hover'}
          variants={open_board_vars}
          custom={{ theme, isSelected }}
        >
          <img src={avatarLink(board?.cover)} alt="board cover" />
          <motion.li className="title_count_wrap">
            <span className="board_title">
              <span>{board ? title : 'Quick Save'}</span>
              <span className="counts">
                <span>{counts ? counts : 0}</span>
                <span>{counts! > 1 ? 'posts' : 'post'}</span>
              </span>
            </span>
            <span>
              <Svg type="right-chev" theme={theme} item={{ size: '1rem' }} />
            </span>
          </motion.li>
        </Lists>
      </Cont>
    </>
  );
};
const Lists = styled(motion.ul)`
  gap: 15px;
  width: 100%;
  display: flex;
  cursor: pointer;
  padding: 10px 12px;
  border-radius: 5px;
  align-items: center;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 5px;
  }
  li {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    //border: 2px solid yellowgreen;
    .board_title {
      font-size: 1.2rem;
      //border: 2px solid yellow;
    }
    .counts {
      display: block;
      font-size: 1rem;
      span {
        margin-right: 5px;
        font-style: italic;
      }
    }
  }
  .cover {
    width: fit-content;
  }
`;
const Cont = styled(FlexCol)`
  align-items: flex-start;
  margin-bottom: 15px;
  h3 {
    font-weight: 500;
    font-size: 1.2rem;
    margin-left: 1rem;
    margin-bottom: 10px;
    color: ${(p) => p.theme.color.logo};
  }
`;
const open_board_vars = {
  hover: () => ({
    color: '#ffffff',
    backgroundColor: '#E50914',
  }),
  animate: ({ theme, isSelected }: any) => ({
    transition: { duration: 0.3 },
    border: isSelected
      ? redBrdr
      : !theme
      ? '1px solid '
      : '1px solid transparent',
    color: isSelected ? '#E50914' : color(theme),
  }),
};
