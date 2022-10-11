import { useState } from 'react';
import styled from '@emotion/styled';
import { BoardBoxInfo } from './Board/BoardBoxInfo';
import { AnimatePresence, motion } from 'framer-motion';
import { PostModal } from '../../components/post/Read/Each';
import { MovieHover } from './Movie/MovieHover';
import { MovieModal } from './Movie/modal';
import { PostBox } from '../../components/post/Read/List/PostBox';
import { Post } from '@prisma/client';
import { IMovie } from '../../types/global';
import { boxVars, SpringTrans } from '../../../styles/variants';
import { ITheme } from '../../../styles/theme';

interface IBoxArray extends ITheme {
  array: [] | any;
  reverse: boolean;
  type: {
    pageType: string;
    sliderType: string;
    sliderDetail?: string;
  };
}

export const BoxArray = ({ type, array, reverse, theme }: IBoxArray) => {
  const [boxID, setBoxID] = useState(0);
  const [postID, setPostID] = useState(0);
  const [modal, setModal] = useState(false);
  const [movieModal, setMovieModal] = useState(false);
  const boxClick = (id: number) => {
    if (type.sliderType === 'movie') {
      setBoxID(id);
      setMovieModal(true);
    }
    if (type.sliderType === 'post') {
      setPostID(id);
      setModal(true);
    }
  };
  const clickBox = (id: number) => {
    setPostID(id);
    setModal(true);
  };
  const clickedPost = array?.find((p: Post) => p.id === postID);
  const imgUrl = (avatar: string, movieBg: string) => {
    if (type.sliderType === 'movie')
      return `https://image.tmdb.org/t/p/original${movieBg}`;
    if (type.sliderType === 'board')
      return `https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/${avatar}/public`;
    else return;
  };
  const isPost = Boolean(type.sliderType === 'post');
  return (
    <AnimatePresence initial={false}>
      {!isPost &&
        array?.map((data: any) => (
          <Box
            exit="exit"
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="box-array"
            key={data.id}
            custom={theme}
            variants={boxVars}
            length={array.length}
            layoutId={data.id + ''}
            transition={SpringTrans}
            onClick={() => boxClick(data.id)}
            boximg={imgUrl(data?.avatar, data?.backdrop_path)}
          >
            {type.sliderType === 'movie' && <MovieHover data={data} />}
            {type.sliderType === 'board' && (
              <BoardBoxInfo data={data} theme={theme} />
            )}
          </Box>
        ))}

      {isPost &&
        array?.map((data: any) => (
          <PostBox
            data={data}
            key={data.id}
            reverse={reverse}
            clickBox={clickBox}
          />
        ))}

      {type.sliderType === 'movie' && (
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
  );
};

const Box = styled(motion.div)<{
  length: number;
  boximg?: string;
}>`
  min-width: 280px;
  display: flex;
  cursor: pointer;
  overflow: hidden;
  border-radius: 5px;
  align-items: flex-end;
  flex-direction: column;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  a {
    width: 100%;
    height: 100%;
  }
  :nth-of-type(1) {
    transform-origin: center left;
  }
  :nth-of-type(${(p) => p.length}) {
    transform-origin: center right;
  }
  background: ${(p) =>
    p.boximg ? `url(${p.boximg}) center / cover no-repeat` : 'transparent'};
`;
