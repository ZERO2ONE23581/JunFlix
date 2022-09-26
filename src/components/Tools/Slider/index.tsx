import useSWR from 'swr';
import { Svg } from '../Svg';
import styled from '@emotion/styled';
import { NoData } from '../NoData';
import { useRouter } from 'next/router';
import { MovieModal } from './Movie/modal';
import { useEffect, useState } from 'react';
import { PostModel } from '../../../types/post';
import { AnimatePresence, motion } from 'framer-motion';
import { IBoardWithAttrs } from '../../../types/board';
import { Boxes } from './Boxes';

interface ISlider {
  type: string;
  movieType?: string;
}
interface IApi {
  arr?: {
    results?: [IMovie];
  };
  posts?: PostModel[];
  boards?: IBoardWithAttrs[];
}
interface IMovie {
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
export const Slider = ({ type, movieType }: ISlider) => {
  const router = useRouter();
  const [api, setApi] = useState('');
  const [page, setPage] = useState(0);
  const [title, setTitle] = useState('');
  const [boxnum, setBoxnum] = useState(6);
  const [leave, setLeave] = useState(false);
  const [array, setArray] = useState<any>([]);
  const isArray = Boolean(array?.length! > 0);
  const [reverse, setReverse] = useState(false);
  const Array = array?.slice(boxnum * page, boxnum + boxnum * page);

  //api
  const { data } = useSWR<IApi>(api);

  useEffect(() => {
    if (type === 'movie' && movieType) {
      setBoxnum(6);
      setApi(`/api/movie/${movieType}`);
      setArray(data?.arr?.results!);
      if (movieType === 'tv') setTitle('TV Shows');
      if (movieType === 'top') setTitle('Classic');
      if (movieType === 'now') setTitle('Now Playing');
      if (movieType === 'upcoming') setTitle('Upcoming');
      if (movieType === 'trending') setTitle('Trending Now');
    }
    if (type === 'post') {
      setBoxnum(5);
      setTitle('Posts');
      setApi(`/api/posts`);
      setArray(data?.posts);
    }
    if (type === 'board') {
      setBoxnum(5);
      setTitle('Boards');
      setApi(`/api/boards`);
      setArray(data?.boards);
    }
    if (type === 'all-boards') {
      setBoxnum(4);
      setTitle('All Boards');
      setTitle('');
      setApi(`/api/boards`);
      setArray(data?.boards);
    }
  }, [type, setApi, setTitle, movieType, setArray, data, setBoxnum]);
  const movieId = Number(
    router?.query?.movie_id && router?.query?.movie_id![0]
  );
  useEffect(() => {
    if (page === 0) setReverse(false);
  }, [page, setReverse]);

  const ArrowClick = (type: string) => {
    if (leave) return;
    setLeave((p) => !p);
    if (type === 'right') {
      setReverse(false);
      setPage((p) => (p === Math.round(array?.length / boxnum) ? 0 : p + 1));
      // setPage((p) =>
      //   p === Math.floor(array?.length / boxnum) - 1 ? 0 : p + 1
      // );
    }
    if (type === 'left') {
      setReverse(true);
      setPage((p) => p - 1);
    }
  };
  const titleClick = () => {
    if (type === 'movie') return router.push(`/movies`);
    if (type === 'post') return router.push(`/posts`);
    if (type === 'board' || type === 'all-boards')
      return router.push(`/boards`);
  };
  return (
    <Cont className="slider">
      <Title onClick={titleClick}>
        <span>{title}</span>
      </Title>
      {isArray && (
        <Flex className="flex">
          {page !== 0 && (
            <Svg
              size="2rem"
              type="chev-left-arrow"
              onClick={() => ArrowClick('left')}
            />
          )}
          <Row className={type}>
            <AnimatePresence
              initial={false}
              custom={reverse}
              onExitComplete={() => setLeave((p) => !p)}
            >
              <Slide
                key={page}
                boxnum={boxnum}
                custom={reverse}
                variants={slideVars}
                exit="exit"
                initial="initial"
                animate="animate"
                transition={{ type: 'tween', duration: 1 }}
                className="slide"
              >
                <Boxes type={type} array={Array} reverse={reverse} />
              </Slide>
            </AnimatePresence>
          </Row>
          <Svg
            size="2rem"
            type="chev-right-arrow"
            onClick={() => ArrowClick('right')}
          />
        </Flex>
      )}

      {type === 'movie' && (
        <MovieModal
          movieId={movieId!}
          data={array?.find((movie: IMovie) => movie.id === movieId)}
          isBoxClicked={Boolean(
            router.query.movie_id && Number(router.query.movie_id) !== 0
          )}
        />
      )}
      {!isArray && <NoData type="movie" />}
    </Cont>
  );
};
const slideVars = {
  initial: (reverse: boolean) => ({
    x: reverse ? -1512 : 1512,
  }),
  animate: (reverse: boolean) => ({
    x: 0,
  }),
  exit: (reverse: boolean) => ({
    x: reverse ? 1512 : -1512,
  }),
};
const Cont = styled.section`
  width: 100%;
  padding: 0 10px;
  a {
    width: 100%;
    height: 100%;
  }
  .movie {
    height: 140px;
  }
  .post {
    height: 200px;
  }

  .board {
    height: 300px;
  }
  .chev-right-arrow,
  .chev-left-arrow {
    opacity: 0.8;
  }
`;
const Title = styled.h1`
  gap: 10px;
  display: flex;
  align-items: center;
  width: fit-content;
  font-size: 1.6rem;
  margin-bottom: 1rem;
  :hover {
    cursor: pointer;
    color: ${(p) => p.theme.color.logo};
    svg {
      fill: ${(p) => p.theme.color.logo};
    }
  }
`;
const Flex = styled.article`
  gap: 5px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Row = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Slide = styled(motion.div)<{ boxnum?: number }>`
  top: 0;
  right: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  gap: 10px;
  display: grid;
  grid-template-columns: ${(p) => `repeat(${p?.boxnum},1fr)`};
  .movie-box {
    z-index: 1;
    overflow: hidden;
  }
  .post-box {
    min-height: 15rem;
    .post-bg {
      min-height: 15rem;
      .post-icon {
        min-height: 15rem;
      }
    }
  }
`;
