import { Icons } from './Icons';
import { Cover } from './Cover';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Svg } from '../../../../Tools/Svg';
import { NoData } from '../../../../Tools/NoData';
import { IBoardType } from '../../../../types/board';
import { Flex, Grid } from '../../../../../styles/global';
import { hoverVars, scaleVar } from '../../../../../styles/variants';
import { useCapLetters } from '../../../../libs/client/useTools';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IBoards {
  _data: {
    theme: boolean;
    isBoard: boolean;
    hideFilter?: boolean;
    boards: IBoardType[];
  };
}
export const BoardsGrid = ({ _data }: IBoards) => {
  const router = useRouter();
  const theme = _data?.theme!;
  const boards = _data?.boards!;
  const hideFilter = _data?.hideFilter!;

  const [genre, setGenre] = useState({
    select: false,
    type: 'all',
  });
  const genreBoard = boards?.filter((e) => e.genre === genre.type);
  const allGenre = Boolean(genre.type === 'all');
  const Boards = genre.select ? (allGenre ? boards : genreBoard) : boards;
  const isBoard = Boolean(_data?.isBoard! && Boards.length > 0);
  return (
    <>
      <Icons theme={theme} setGenre={setGenre} hideFilter={hideFilter} />
      <AnimatePresence>
        {isBoard && (
          <Cont
            box={5}
            exit="exit"
            animate="animate"
            initial="initial"
            variants={scaleVar}
            custom={{ theme, duration: 0.6 }}
          >
            {Boards?.map((board) => (
              <Box
                custom={theme}
                key={board.id}
                variants={hoverVars}
                animate="animate"
                whileHover="hover"
                className="grid-box"
                onClick={() => router.push(`/board/${board.id}/${board.title}`)}
              >
                <Cover theme={theme} posts={board.posts} />
                <Info className="info">
                  <Flex className="flex-wrap">
                    <h1>{useCapLetters(board.title)}</h1>
                    <Svg
                      theme={theme}
                      item={{ size: '1.6rem' }}
                      type={board.genre ? board.genre : 'film'}
                    />
                  </Flex>
                  <div className="post-length">
                    <span>{board.posts.length}</span>
                    <span>Posts</span>
                  </div>
                </Info>
              </Box>
            ))}
          </Cont>
        )}
      </AnimatePresence>
      {!isBoard && <NoData theme={theme} />}
    </>
  );
};
const Cont = styled(Grid)`
  width: fit-content;
  .flex-wrap {
    justify-content: space-between;
    //border: 1px solid pink;
  }
`;
const Box = styled(motion.div)`
  cursor: pointer;
  .board-cover {
    width: 100%;
    height: 16rem;
    min-width: 16rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;
const Info = styled.div`
  padding: 1rem;
  font-size: 1.4rem;
  height: 5rem;
  h1 {
    margin-bottom: 8px;
  }
  .post-length {
    font-size: 1.1rem;
    font-style: italic;
    span {
      margin-right: 5px;
    }
  }
`;
