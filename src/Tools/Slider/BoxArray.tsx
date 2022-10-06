import { useState } from 'react';
import styled from '@emotion/styled';
import { BoardBoxInfo } from './Board/BoardBoxInfo';
import { AnimatePresence, motion } from 'framer-motion';
import { PostModal } from '../../components/Post/Read/Each';
import { MovieHover } from './Movie/MovieHover';
import { MovieModal } from './Movie/modal';
import { PostBox } from '../../components/Post/Read/List/PostBox';
import { Post } from '@prisma/client';
import { IMovie } from '../../types/global';
import { boxVars, SpringTrans } from '../../../styles/variants';

interface IBoxArray {
  array: [] | any;
  reverse: boolean;
  type: {
    pageType: string;
    sliderType: string;
    sliderDetail?: string;
  };
}

export const BoxArray = ({ type, array, reverse }: IBoxArray) => {
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
    <AnimatePresence>
      {!isPost &&
        array?.map((data: any) => (
          <Box
            className="box-array"
            length={array.length}
            onClick={() => boxClick(data.id)}
            boximg={imgUrl(data?.avatar, data?.backdrop_path)}
            //
            key={data.id}
            custom={reverse}
            variants={boxVars}
            initial="initial"
            whileHover="hover"
            layoutId={data.id + ''}
            transition={SpringTrans}
          >
            {type.sliderType === 'movie' && <MovieHover data={data} />}
            {type.sliderType === 'board' && <BoardBoxInfo data={data} />}
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