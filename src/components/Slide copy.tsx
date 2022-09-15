import { useEffect, useState } from 'react';
import { Svg } from './Tools/Svg';
import styled from '@emotion/styled';
import { NoData } from './Tools/NoData';
import { Item } from './Post/Read/List/PostBox';
import { IBoardWithAttrs } from '../types/board';
import { BoardBox } from './Board/Read/List/Board';
import { AnimatePresence, motion } from 'framer-motion';
import { boxVars, MotionBox, rowVars } from '../../styles/global';

interface ISlider {
  type: string;
  array?: IBoardWithAttrs[];
}
export const Slide = ({ array, type }: ISlider) => {
  const offset = 5;
  const [page, setPage] = useState(0);
  const Length = Number(array?.length);
  const MaxIndex = Math.floor(Length / offset) - 1;
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked((p) => !p);
  const increaseIndex = () => {
    if (clicked) return;
    toggleClicked();
    setPage((p) => (p === MaxIndex ? 0 : p + 1));
  };
  const [title, setTitle] = useState('');
  useEffect(() => {
    if (type === 'movie') setTitle('Movies 인기영화');
    if (type === 'post') setTitle('Posts 포스트');
    if (type === 'board') setTitle('Boards 보드');
  }, [setTitle, type]);

  return (
    <Cont className="slide">
      {title && (
        <h1>
          <span>{title}</span>
          <Svg type={type} size="2rem" />
        </h1>
      )}
      <div className="flex">
        <AnimatePresence initial={false} onExitComplete={toggleClicked}>
          <Row
            className="row"
            key={page}
            variants={rowVars}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'tween', duration: 1 }}
          >
            {type === 'board' &&
              array?.length! > 0 &&
              array
                ?.slice(offset * page, offset + offset * page)
                ?.map((item) => (
                  <BoardBox
                    key={item.id}
                    boardId={item.id}
                    genre={item.genre}
                    title={item.title}
                    userId={item.UserID}
                    avatar={item.avatar!}
                    username={item.user.username!}
                  />
                ))}
            {type === 'board' && array?.length! === 0 && (
              <NoData type="board" key={page} />
            )}

            {type === 'movie' &&
              array?.length! > 0 &&
              array
                ?.slice(offset * page, offset + offset * page)
                .map((item: any) => (
                  <MovieBox
                    key={item.id}
                    className="movie"
                    variants={boxVars}
                    initial="initial"
                    whileHover="hover"
                    bg={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                  >
                    {/* <Info item={item} /> */}
                  </MovieBox>
                ))}
            {type === 'movie' && array?.length! === 0 && (
              <NoData type="movie" key={page} />
            )}

            {type === 'post' &&
              array?.length! > 0 &&
              array
                ?.slice(offset * page, offset + offset * page)
                .map((item: any) => (
                  <MotionBox
                    key={item.id}
                    variants={boxVars}
                    initial="initial"
                    whileHover="hover"
                  >
                    <Item post={item} />
                  </MotionBox>
                ))}
            {type === 'movie' && array?.length! === 0 && (
              <NoData type="post" key={page} />
            )}
          </Row>
        </AnimatePresence>
        <Svg size="2.5rem" type="chev-arrow" onClick={increaseIndex} />
      </div>
    </Cont>
  );
};
const Cont = styled.article`
  h1 {
    gap: 15px;
    display: flex;
    font-weight: 500;
    font-size: 1.8rem;
    align-items: center;
    padding-left: 100px;
  }
  .flex {
    position: relative;
    border: 5px solid red;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Row = styled(motion.div)`
  gap: 10px;
  width: 100%;
  display: grid;
  padding: 0 80px;
  position: absolute;
  grid-template-columns: repeat(5, 1fr);
`;
const MovieBox = styled(motion.div)<{ bg: string }>`
  border: none;
  overflow: hidden;
  position: relative;
  border-radius: 5px;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background: ${(prev) => `url(${prev.bg}) center / cover no-repeat`};
  &:first-of-type {
    transform-origin: center left;
  }
  &:last-of-type {
    transform-origin: center right;
  }
`;
