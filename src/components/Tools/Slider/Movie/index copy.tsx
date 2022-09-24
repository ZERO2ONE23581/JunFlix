import useSWR from 'swr';
import { Svg } from '../../Svg';
import { MovieHover } from './hover';
import styled from '@emotion/styled';
import { MovieModal } from './modal';
import { NoData } from '../../NoData';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { slideVars } from '../../../../../styles/global';
import { AnimatePresence, motion } from 'framer-motion';

interface IMovieSlider {
  type: string;
}
interface IMovieApi {
  arr: {
    results: [
      {
        id: number;
        title?: string;
        overview?: string;
        vote_average?: number;
        release_date?: string;
        original_title?: string;
        original_language?: string;
        original_name?: string;
        poster_path?: string;
        backdrop_path?: string;
      }
    ];
  };
}
export const MovieSlider = ({ type }: IMovieSlider) => {
  const router = useRouter();
  const [api, setApi] = useState('');
  const [title, setTitle] = useState('');
  useEffect(() => {
    if (type) setApi(`/api/movie/${type}`);
    if (type === 'tv') setTitle('TV Shows');
    if (type === 'top') setTitle('Classic');
    if (type === 'now') setTitle('Now Playing');
    if (type === 'upcoming') setTitle('Upcoming');
    if (type === 'trending') setTitle('Trending Now');
  }, [type, setApi, setTitle]);
  const { data } = useSWR<IMovieApi>(api);
  //
  const offset = 6;
  const [page, setPage] = useState(0);
  const array = data?.arr?.results;
  const slicedArray = array?.slice(offset * page, offset + offset * page);
  const isData = Boolean(array?.length! > 0);
  const Length = Number(array?.length);
  const MaxIndex = Math.floor(Length / offset) - 1;
  const [leave, setLeave] = useState(false);
  const [reverse, setReverse] = useState(false);
  useEffect(() => {
    if (page === 0) setReverse(false);
  }, [page, setReverse]);
  const clickRight = () => {
    setReverse(false);
    if (leave) return;
    setLeave((p) => !p);
    setPage((p) => (p === MaxIndex ? 0 : p + 1));
  };
  const clickLeft = () => {
    setReverse(true);
    if (leave) return;
    setLeave((p) => !p);
    setPage((p) => p - 1);
  };
  //
  const onBoxClick = (movieId: number) => {
    router.push(`/home/${movieId}`);
  };
  const chosenId = Number(
    router?.query?.movie_id && router?.query?.movie_id![0]
  );
  const clickedMovie = () => {
    if (chosenId) return array?.find((movie) => movie.id === chosenId);
  };
  return (
    <SliderWrap>
      <h1 onClick={() => router.push(`/movies`)}>
        <span>{title}</span>
      </h1>
      {isData && (
        <Wrap>
          {page !== 0 && (
            <Svg size="2rem" type="chev-left-arrow" onClick={clickLeft} />
          )}
          <Row>
            <AnimatePresence
              initial={false}
              custom={reverse}
              onExitComplete={() => setLeave((p) => !p)}
            >
              <Slide
                key={page}
                custom={reverse}
                variants={slideVars}
                exit="exit"
                initial="initial"
                animate="animate"
                transition={{ type: 'tween', duration: 1 }}
              >
                {slicedArray?.map((movie) => (
                  <Box
                    custom={reverse}
                    key={movie.id}
                    initial="initial"
                    whileHover="hover"
                    className="movie-box"
                    layoutId={movie.id + ''}
                    variants={movieBoxVars}
                    onClick={() => onBoxClick(movie.id)}
                    bg={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                  >
                    <MovieHover data={movie} />
                  </Box>
                ))}
              </Slide>
            </AnimatePresence>
          </Row>
          <Svg size="2rem" type="chev-right-arrow" onClick={clickRight} />
        </Wrap>
      )}
      <MovieModal
        movieId={chosenId!}
        data={clickedMovie()!}
        isBoxClicked={Boolean(
          router.query.movie_id && Number(router.query.movie_id) !== 0
        )}
      />
      {!isData && <NoData type="movie" />}
    </SliderWrap>
  );
};
export const movieBoxVars = {
  initial: {
    scale: 1,
  },
  hover: {
    zIndex: 11,
    y: -20,
    scale: 1.7,
    transition: {
      delay: 0.2,
      duration: 0.3,
    },
  },
};
export const SliderWrap = styled.section`
  .chev-right-arrow,
  .chev-left-arrow {
    opacity: 0.8;
  }
  > h1 {
    gap: 10px;
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    margin-left: 40px;
    margin-bottom: 20px;
    :hover {
      cursor: pointer;
      color: ${(p) => p.theme.color.logo};
      svg {
        fill: ${(p) => p.theme.color.logo};
      }
    }
  }
`;
export const Wrap = styled.article`
  gap: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Row = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Slide = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 150px;
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  .movie-box {
    z-index: 1;
    overflow: hidden;
  }
`;
const Box = styled(motion.div)<{ bg: string }>`
  cursor: pointer;
  display: flex;
  align-items: flex-end;
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
