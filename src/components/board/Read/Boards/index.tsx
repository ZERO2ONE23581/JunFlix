import { Icons } from './Icons';
import { useState } from 'react';
import { BoardBox } from './Box';
import { QuickBox } from './Quick';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../../../Tools/Button';
import { AnimatePresence } from 'framer-motion';
import { NoData } from '../../../../Tools/NoData';
import { IPostType } from '../../../../types/post';
import { IBoardType } from '../../../../types/board';
import { color } from '../../../../../styles/variants';
import { FlexCol_, Grid } from '../../../../../styles/global';
import { useResponsive } from '../../../../libs/client/useTools';

export const BoardsGrid = ({ _data, _genre }: IBoards) => {
  const { theme, user_id, isBoard, hideFilter, boards, quickSaved } = _data;
  const isHide = Boolean(hideFilter! || _genre);
  const [genre, setGenre] = useState({ select: false, type: 'all' });
  const clickBack = () => setGenre({ select: false, type: 'all' });
  const array = () => {
    const type = genre.type;
    const selected = genre.select;
    if (selected) {
      if (type === 'all') return boards;
      else return boards?.filter((e) => e.genre === genre.type);
    } else return boards;
  };

  const router = useRouter();
  const length = array()?.length;
  const [edit, setEdit] = useState(false);
  const { isMobile, isDesk } = useResponsive();
  const isAnyQuick = Boolean(quickSaved?.length! > 0);
  const isAllBoardPage = Boolean(router.asPath === '/board/all');
  const isQS = isAnyQuick && !edit;
  const plused = length + 1;
  const max = isMobile ? 2 : 5;
  const isMax = Boolean(length >= max);
  const isPlused = Boolean(plused >= max);
  const IsBoard = Boolean(isBoard! && length! > 0);
  const boxes = isQS ? (isPlused ? max : plused) : isMax ? max : length;
  const __isQuick = {
    theme,
    user_id,
    board_id: 0,
    genre: null!,
    posts: quickSaved!,
    title: 'Quick Saved',
  };
  return (
    <Cont isDesk={isDesk} className="boards_grid">
      {IsBoard && <Icons _data={{ theme, setGenre, isHide, setEdit }} />}
      <AnimatePresence>
        {IsBoard && (
          <Array
            exit="exit"
            box={boxes}
            custom={theme}
            variants={vars}
            className="grid"
            initial="initial"
            animate="animate"
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
        {!IsBoard && (
          <>
            <NoData _data={{ theme, isMy: false, type: 'board' }} />
            <Btn
              type="button"
              onClick={clickBack}
              item={{ name: 'Back', theme, className: 'back_btn' }}
            />
          </>
        )}
      </AnimatePresence>
    </Cont>
  );
};
const Cont = styled(FlexCol_)`
  width: fit-content;
  align-items: flex-end;
  .grid {
    gap: ${(p) => !p.isDesk && '2.1rem'};
  }
  .back_btn {
    margin: 0 auto;
    border-radius: 40px;
    width: ${(p) => (p.isDesk ? '100px' : '200px')};
    font-size: ${(p) => (p.isDesk ? '1.1rem' : '2.5rem')};
  }
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
