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
import useUser from '../../../libs/client/useUser';
import { useCapLetter } from '../../../libs/client/useTools';

interface ISlider {
  type: string;
  movieType?: string;
  boardType?: string;
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
export const Slider = ({ type, movieType, boardType }: ISlider) => {
  const router = useRouter();
  const { loggedInUser } = useUser();

  //BOARD api
  const [api, setApi] = useState('');
  useEffect(() => {
    if (type === 'board') setApi(`/api/boards`);
  }, [type, setApi]);
  const { data } = useSWR<IApi>(api);

  //BOARD Array
  const [array, setArray] = useState<any>([]);
  useEffect(() => {
    if (type === 'board') {
      if (boardType === 'all' || boardType === 'home') {
        setArray(data?.boards);
      } else if (boardType === 'my') {
        setArray(data?.boards?.filter((p) => p.UserID === loggedInUser?.id));
      } else {
        setArray(
          data?.boards?.filter((p) => p.genre === useCapLetter(boardType!))
        );
      }
    }
  }, [type, boardType, data, setArray, useCapLetter]);
  const isArray = Boolean(array?.length! > 0);

  //BOARD Boxes
  const [boxes, setBoxes] = useState(6);
  useEffect(() => {
    if (type === 'board') {
      if (boardType === 'home') {
        setBoxes(5);
      } else {
        setBoxes(4);
      }
    }
  }, [type, boardType, setBoxes]);

  //BOARD title
  const [title, setTitle] = useState('');
  useEffect(() => {
    if (type === 'board') {
      if (boardType === 'home') {
        setTitle('All Boards');
      } else setTitle('');
    }
  }, [type, boardType, setTitle]);

  //MOVIE api
  const query = router?.query?.movie_id;
  const movieId = Number(query && query![0]);
  useEffect(() => {
    if (type === 'movie' && movieType) {
      if (movieType === 'home') {
        setApi(`/api/movie/trending`);
      } else {
        setApi(`/api/movie/${movieType}`);
      }
    }
  }, [type, movieType, setApi]);

  //movie array
  useEffect(() => {
    if (type === 'movie') {
      setArray(data?.arr?.results!);
    }
  }, [type, setArray, data]);

  //movie boxes
  useEffect(() => {
    if (type === 'movie') {
      if (movieType === 'home') {
        setBoxes(6);
      } else {
        setBoxes(5);
      }
    }
  }, [type, setBoxes, movieType]);

  //movie title
  useEffect(() => {
    if (type === 'movie' && movieType) {
      if (movieType === 'home') setTitle('Trending');
      if (movieType === 'tv') setTitle('TV Shows');
      if (movieType === 'top') setTitle('Classic');
      if (movieType === 'now') setTitle('Now Playing');
      if (movieType === 'upcoming') setTitle('Upcoming');
      if (movieType === 'trending') setTitle('Trending Now');
    }
  }, [type, setTitle, movieType]);

  useEffect(() => {
    if (type === 'post') {
      setBoxes(5);
      setTitle('Posts');
      setArray(data?.posts);
    }
  }, [type, setTitle, setArray, data, setBoxes]);
  //

  const [page, setPage] = useState(0);
  const [leave, setLeave] = useState(false);
  const [reverse, setReverse] = useState(false);
  const SlicedArr = array?.slice(boxes * page, boxes + boxes * page);
  useEffect(() => {
    if (page === 0) setReverse(false);
  }, [page, setReverse]);

  const isLessBoxes = Boolean(array?.length <= boxes);
  const isFirstPage = Boolean(page === 0);
  const clickRight = () => {
    if (leave) return;
    setLeave((p) => !p);
    setReverse(false);
    setPage((p) => (p === Math.ceil(array?.length / boxes) - 1 ? 0 : p + 1));
  };
  const clickLeft = () => {
    if (isFirstPage) return;
    if (leave) return;
    setLeave((p) => !p);
    setReverse(true);
    setPage((p) => p - 1);
  };
  const titleClick = () => {
    if (type === 'movie') return router.push(`/movies`);
    if (type === 'post') return router.push(`/posts`);
    if (type === 'board' || type === 'allBoards') return router.push(`/boards`);
  };

  return (
    <Cont className="slider">
      <H1 onClick={titleClick} className="title">
        <span>{title}</span>
      </H1>
      {isArray && (
        <Flex
          className="flex"
          isFirstPage={isFirstPage}
          isLessBoxes={isLessBoxes}
        >
          <Svg size="2rem" type="chev-left-arrow" onClick={clickLeft} />
          <Row className="row">
            <AnimatePresence
              initial={false}
              custom={reverse}
              onExitComplete={() => setLeave((p) => !p)}
            >
              <Slide
                key={page}
                boxes={boxes}
                custom={reverse}
                variants={slideVars}
                exit="exit"
                initial="initial"
                animate="animate"
                transition={{ type: 'tween', duration: 1 }}
                className="slide"
              >
                <Boxes type={type} array={SlicedArr} reverse={reverse} />
              </Slide>
            </AnimatePresence>
          </Row>
          <Svg size="2rem" type="chev-right-arrow" onClick={clickRight} />
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
  a {
    width: 100%;
    height: 100%;
  }
  .chev-right-arrow,
  .chev-left-arrow {
    opacity: 0.8;
  }
`;
const H1 = styled.h1`
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
const Flex = styled.article<{ isFirstPage: boolean; isLessBoxes: boolean }>`
  gap: 5px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .chev-right-arrow {
    opacity: ${(p) => p.isLessBoxes && 0};
    pointer-events: ${(p) => p.isLessBoxes && 'none'};
  }
  .chev-left-arrow {
    opacity: ${(p) => p.isFirstPage && 0};
    pointer-events: ${(p) => p.isFirstPage && 'none'};
  }
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
const Slide = styled(motion.div)<{ boxes?: number }>`
  top: 0;
  right: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  gap: 10px;
  display: grid;
  grid-template-columns: ${(p) => `repeat(${p?.boxes},1fr)`};
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
