import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { Svg } from '../Svg';
import styled from '@emotion/styled';
import { NoData } from '../NoData';
import { AnimatePresence, motion } from 'framer-motion';
import { rowVars } from '../../../../styles/global';
import { useRouter } from 'next/router';
import { MovieHover } from './movieHover';

interface IMovieSlider {
  type: string;
}
export interface IMovie {
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
  const { data } = useSWR(api);
  //
  const offset = 6;
  const [page, setPage] = useState(0);
  const array = data?.arr?.results;
  const slicedArray = array?.slice(offset * page, offset + offset * page);
  const isData = Boolean(array?.length! > 0);
  const Length = Number(array?.length);
  const MaxIndex = Math.floor(Length / offset) - 1;
  //
  const [leave, setLeave] = useState(false);
  const increaseIndex = () => {
    if (leave) return;
    setLeave((p) => !p);
    setPage((p) => (p === MaxIndex ? 0 : p + 1));
  };
  console.log(data?.arr?.results);
  return (
    <SliderCont>
      <h1 onClick={() => router.push(`/movies`)}>
        <span>{title}</span>
      </h1>
      {isData && (
        <Wrap>
          <Svg size="2rem" type="chev-left-arrow" onClick={() => {}} />
          <Row>
            <AnimatePresence
              initial={false}
              onExitComplete={() => setLeave((p) => !p)}
            >
              <Slide
                key={page}
                variants={rowVars}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: 'tween', duration: 1 }}
              >
                {slicedArray?.map((item: IMovie) => (
                  <Box
                    key={item.id}
                    className="movie-box"
                    variants={movieBoxVars}
                    initial="initial"
                    whileHover="hover"
                    bg={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                  >
                    <MovieHover
                      title={
                        item.original_name
                          ? item.original_name!
                          : item.original_title!
                      }
                      date={item.release_date!}
                      rate={item.vote_average!}
                      lang={item.original_language!}
                    />
                    {/* <MovieInfo
                      title={
                        item.original_name
                          ? item.original_name!
                          : item.original_title!
                      }
                      date={item.release_date!}
                      rate={item.vote_average!}
                    /> */}
                  </Box>
                ))}
              </Slide>
            </AnimatePresence>
          </Row>
          <Svg size="2rem" type="chev-right-arrow" onClick={increaseIndex} />
        </Wrap>
      )}
      {!isData && <NoData type="movie" />}
    </SliderCont>
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
export const SliderCont = styled.section`
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
    margin-bottom: 10px;
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
