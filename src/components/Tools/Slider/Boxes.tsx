import { useState } from 'react';
import styled from '@emotion/styled';
import { BoardBoxInfo } from './Board/BoardBoxInfo';
import { AnimatePresence, motion } from 'framer-motion';
import { PostModal } from '../../Post/Read/Each';
import { MovieHover } from './Movie/MovieHover';
import { MovieModal } from './Movie/modal';
import { IMovie } from '.';
import { PostBox } from '../../Post/Read/List/PostBox';
import { Post } from '@prisma/client';

interface IBoxes {
  array: [] | any;
  type: string;
  reverse: boolean;
}

export const Boxes = ({ type, array, reverse }: IBoxes) => {
  const [boxID, setBoxID] = useState(0);
  const [postID, setPostID] = useState(0);
  const [modal, setModal] = useState(false);
  const [movieModal, setMovieModal] = useState(false);
  const boxClick = (id: number) => {
    if (type === 'movie' || type === 'movie-page') {
      setBoxID(id);
      setMovieModal(true);
    }
    if (type === 'post') {
      setPostID(id);
      setModal(true);
    }
  };
  const clickBox = (id: number) => {
    setPostID(id);
    setModal(true);
  };
  const clickedPost = array?.find((p: Post) => p.id === postID);

  return (
    <>
      <AnimatePresence>
        {array?.map((data: any) => (
          <Box
            type={type}
            className="box"
            onClick={() => boxClick(data.id)}
            length={array.length}
            avatar={data?.avatar! && data?.avatar!}
            moviebg={data?.backdrop_path && data?.backdrop_path}
            //
            key={data.id}
            custom={reverse}
            variants={boxVars}
            initial="initial"
            whileHover="hover"
            layoutId={data.id + ''}
            transition={{ type: 'spring', stiffness: 50 }}
          >
            {(type === 'movie' || type === 'movie-page') && (
              <MovieHover data={data} />
            )}
            {type === 'board' && <BoardBoxInfo data={data} />}
            {type === 'post' && (
              <PostBox key={data.id} clickBox={clickBox} data={data} />
            )}
          </Box>
        ))}
        {(type === 'movie' || type === 'movie-page') && (
          <>
            {movieModal && (
              <MovieModal
                movieId={boxID}
                setMovieModal={setMovieModal}
                data={array?.find((movie: IMovie) => movie.id === boxID)!}
              />
            )}
          </>
        )}
        {modal && <PostModal data={clickedPost!} setModal={setModal} />}
      </AnimatePresence>
    </>
  );
};

const boxVars = {
  initial: {
    scale: 1,
  },
  hover: {
    zIndex: 11,
    y: -20,
    scale: 1.35,
    transition: {
      delay: 0.3,
      duration: 0.3,
    },
  },
};
const Box = styled(motion.div)<{
  type: string;
  length: number;
  moviebg?: string;
  avatar?: string;
}>`
  display: flex;
  cursor: pointer;
  overflow: hidden;
  border-radius: 5px;
  align-items: flex-end;
  flex-direction: column;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  :nth-of-type(1) {
    transform-origin: center left;
  }
  :nth-of-type(${(p) => p.length}) {
    transform-origin: center right;
  }
  a {
    width: 100%;
  }
  background: ${(p) =>
    p.moviebg &&
    `url(https://image.tmdb.org/t/p/original${p.moviebg}) center / cover no-repeat`};
  background: ${(p) =>
    p.avatar &&
    `url(https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/${p.avatar}/public) center / cover no-repeat `};
`;
