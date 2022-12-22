import { Icons } from './Icons';
import { useState } from 'react';
import { BoardBox } from './Box';
import { QuickBox } from './Quick';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { NoData } from '../../../../Tools/NoData';
import { IPostType } from '../../../../types/post';
import { IBoardType } from '../../../../types/board';
import { color } from '../../../../../styles/variants';
import { FlexCol, Grid } from '../../../../../styles/global';

interface IBoards {
  _genre?: string;
  _data: {
    theme: boolean;
    user_id?: number;
    isBoard: boolean;
    hideFilter?: boolean;
    boards: IBoardType[];
    quickSaved?: IPostType[];
  };
}
export const BoardsGrid = ({ _data, _genre }: IBoards) => {
  const { theme, user_id, isBoard, hideFilter, boards, quickSaved } = _data;
  const isHide = Boolean(hideFilter! || _genre);
  const [genre, setGenre] = useState({ select: false, type: 'all' });
  const array = () => {
    const type = genre.type;
    const selected = genre.select;
    if (selected) {
      if (type === 'all') return boards;
      else return boards?.filter((e) => e.genre === genre.type);
    } else return boards;
  };
  const __isQuick = {
    theme,
    user_id,
    board_id: 0,
    genre: null!,
    posts: quickSaved!,
    title: 'Quick Saved',
  };
  const router = useRouter();
  const length = array()?.length;
  const [edit, setEdit] = useState(false);
  const isAnyQuick = Boolean(quickSaved?.length! > 0);
  const isAllBoardPage = Boolean(router.asPath === '/board/all');
  const isQS = isAnyQuick && !edit;
  const max = 5;
  const plused = length + 1;
  const isMax = Boolean(length >= max);
  const isPlused = Boolean(plused >= max);
  const IsBoard = Boolean(isBoard! && length! > 0);
  const boxes = isQS ? (isPlused ? max : plused) : isMax ? max : length;
  return (
    <Cont className="boards_grid">
      {IsBoard && <Icons _data={{ theme, setGenre, isHide, setEdit }} />}
      <AnimatePresence>
        {IsBoard && (
          <Array
            exit="exit"
            animate="animate"
            initial="initial"
            box={boxes}
            custom={theme}
            variants={vars}
          >
            {array()?.map((board) => (
              <BoardBox
                key={board.id}
                posts={board.posts}
                _boolean={{ edit, theme }}
                _id={{ board_id: board.id, user_id: board.host_id }}
                _string={{ title: board.title, genre: board.genre! }}
              />
            ))}
            {!isAllBoardPage && <QuickBox _data={{ ...__isQuick, isQS }} />}
          </Array>
        )}
        {!IsBoard && <NoData _data={{ theme, isMy: false, type: 'board' }} />}
      </AnimatePresence>
    </Cont>
  );
};
const Cont = styled(FlexCol)`
  width: fit-content;
  align-items: flex-end;
`;
const Array = styled(Grid)`
  width: fit-content;
`;
const vars = {
  exit: () => ({ scale: 0, opacity: 0, transition: { duration: 0.8 } }),
  initial: () => ({ scale: 0, opacity: 0, transition: { duration: 0.8 } }),
  animate: (theme: boolean) => ({
    scale: 1,
    opacity: 1,
    color: color(theme),
    transition: { duration: 0.8 },
  }),
};
