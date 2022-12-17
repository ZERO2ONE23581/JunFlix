import { GridBox } from './Box';
import { Icons } from './Icons';
import { useState } from 'react';
import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { NoData } from '../../../../Tools/NoData';
import { IPostType } from '../../../../types/post';
import { IBoardType } from '../../../../types/board';
import { scaleVar } from '../../../../../styles/variants';
import { FlexCol, Grid } from '../../../../../styles/global';

interface IBoards {
  _data: {
    theme: boolean;
    user_id?: number;
    isBoard: boolean;
    hideFilter?: boolean;
    boards: IBoardType[];
    quickSaved?: IPostType[];
  };
}
export const BoardsGrid = ({ _data }: IBoards) => {
  const theme = _data?.theme!;
  const boards = _data?.boards!;
  const quickSaved = _data?.quickSaved!;
  const hideFilter = _data?.hideFilter!;
  const isQuickSaved = Boolean(quickSaved?.length);
  const [genre, setGenre] = useState({ select: false, type: 'all' });
  const allGenre = Boolean(genre.type === 'all');
  const genreBoard = boards?.filter((e) => e.genre === genre.type);
  const Boards = genre.select ? (allGenre ? boards : genreBoard) : boards;
  const isBoard = Boolean(_data?.isBoard! && Boards.length > 0);
  return (
    <Cont className="boards_grid">
      <Icons theme={theme} setGenre={setGenre} hideFilter={hideFilter} />
      <AnimatePresence>
        {isBoard && (
          <Grid
            box={5}
            exit="exit"
            animate="animate"
            initial="initial"
            variants={scaleVar}
            custom={{ theme, duration: 0.6 }}
          >
            {isQuickSaved && (
              <GridBox
                _data={{
                  theme,
                  board_id: 0,
                  genre: null!,
                  posts: quickSaved,
                  title: 'Quick Saved',
                  user_id: _data?.user_id!,
                }}
              />
            )}
            {Boards?.map((board) => (
              <GridBox
                key={board.id}
                _data={{
                  theme,
                  title: board.title,
                  board_id: board.id,
                  genre: board.genre!,
                  posts: board.posts,
                }}
              />
            ))}
          </Grid>
        )}
      </AnimatePresence>
      {!isBoard && <NoData theme={theme} />}
    </Cont>
  );
};
const Cont = styled(FlexCol)`
  min-width: 1250px;
  width: fit-content;
  align-items: flex-end;
  justify-content: flex-start;
  //border: 10px solid blue;
`;
