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
  isBoardPage?: boolean;
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
export const Slider = ({
  type,
  movieType,
  boardType,
  isBoardPage,
}: ISlider) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  //BOARD

  //api
  const [api, setApi] = useState('');
  useEffect(() => {
    if (type === 'board') setApi(`/api/boards`);
  }, [type, setApi]);
  const { data } = useSWR<IApi>(api);

  //array 장르영화 빼고 전부 data통채로 들어감
  const [array, setArray] = useState<any>([]);
  useEffect(() => {
    if (type === 'board') {
      const isGenre = !Boolean(
        boardType === 'all' || boardType === 'home' || boardType === 'my'
      );
      if (isGenre)
        setArray(
          data?.boards?.filter((p) => p.genre === useCapLetter(boardType!))
        );
      if (!isGenre) setArray(data?.boards);
    }
  }, [type, boardType, data, setArray, useCapLetter]);
  const isArray = Boolean(array?.length! > 0);

  //box all과 home -> 5, 나머지는 4
  const [boxes, setBoxes] = useState(6);
  useEffect(() => {
    if (type === 'board') {
      const fiveBoxes = Boolean(isBoardPage || boardType === 'home');
      if (fiveBoxes) setBoxes(5);
      if (!fiveBoxes) setBoxes(4);
    }
  }, [type, boardType, isBoardPage, setBoxes]);

  //title
  const [title, setTitle] = useState('');
  useEffect(() => {
    if (type === 'board') {
      if (boardType === 'home' || isBoardPage) {
        if (boardType === 'all') setTitle('All Boards');
        if (boardType === 'my') setTitle('My Boards');
        if (boardType === 'Sf') setTitle('SF Boards');
        if (boardType === 'Action') setTitle('Action Boards');
        if (boardType === 'Drama') setTitle('Drama Boards');
        if (boardType === 'Horror') setTitle('Horror Boards');
        if (boardType === 'Thriller') setTitle('Thriller Boards');
        if (boardType === 'Mystery') setTitle('Mystery Boards');
        if (boardType === 'Comedy') setTitle('Comedy Boards');
        if (boardType === 'Fantasy') setTitle('Fantasy Boards');
        if (boardType === 'Adventure') setTitle('Adventure Boards');
      } else setTitle('');
    }
  }, [type, boardType, isBoardPage]);

  //MOVIE
  useEffect(() => {
    if (type === 'movie' && movieType) {
      setBoxes(6);
      setApi(`/api/movie/${movieType}`);
      setArray(data?.arr?.results!);
      if (movieType === 'tv') setTitle('TV Shows');
      if (movieType === 'top') setTitle('Classic');
      if (movieType === 'now') setTitle('Now Playing');
      if (movieType === 'upcoming') setTitle('Upcoming');
      if (movieType === 'trending') setTitle('Trending Now');
    }
    if (type === 'post') {
      setBoxes(5);
      setTitle('Posts');
      setApi(`/api/posts`);
      setArray(data?.posts);
    }
  }, [
    useCapLetter,
    type,
    setTitle,
    movieType,
    setArray,
    data,
    setBoxes,
    loggedInUser,
  ]);
  // useEffect(() => {
  //   if (type === 'board') {
  //     if (isBoardPage) {
  //       setBoxes(5);
  //     } else if (boardType === 'home') {
  //       setBoxes(5);
  //       setTitle('Boards');
  //       setArray(data?.boards);
  //     } else if (boardType === 'all') {
  //       setBoxes(4);
  //       setTitle('All Boards');
  //       setArray(data?.boards);
  //     } else if (boardType === 'my') {
  //       setBoxes(4);
  //       setTitle('My Boards');
  //       setArray(data?.boards);
  //     }
  //     // if (boardType !== 'all' && boardType !== 'my') {
  //     //   setBoxes(4);
  //     //   setTitle('');
  //     //   setApi(`/api/boards`);
  //     //   setArray(
  //     //     data?.boards?.filter((p) => p.genre === useCapLetter(boardType!))
  //     //   );
  //     // }
  //   }
  //   if (type === 'movie' && movieType) {
  //     setBoxes(6);
  //     setApi(`/api/movie/${movieType}`);
  //     setArray(data?.arr?.results!);
  //     if (movieType === 'tv') setTitle('TV Shows');
  //     if (movieType === 'top') setTitle('Classic');
  //     if (movieType === 'now') setTitle('Now Playing');
  //     if (movieType === 'upcoming') setTitle('Upcoming');
  //     if (movieType === 'trending') setTitle('Trending Now');
  //   }
  //   if (type === 'post') {
  //     setBoxes(5);
  //     setTitle('Posts');
  //     setApi(`/api/posts`);
  //     setArray(data?.posts);
  //   }
  // }, [
  //   useCapLetter,
  //   boardType,
  //   type,
  //   setApi,
  //   setTitle,
  //   movieType,
  //   setArray,
  //   data,
  //   setBoxes,
  //   loggedInUser,
  // ]);
  const movieId = Number(
    router?.query?.movie_id && router?.query?.movie_id![0]
  );

  const [page, setPage] = useState(0);
  const [leave, setLeave] = useState(false);
  const [reverse, setReverse] = useState(false);
  const SlicedArr = array?.slice(boxes * page, boxes + boxes * page);
  useEffect(() => {
    if (page === 0) setReverse(false);
  }, [page, setReverse]);

  const ArrowClick = (arrow: string) => {
    const showAll = Boolean(
      type === 'allBoards' || type === 'myBoards' || boardType
    );
    if (leave) return;
    setLeave((p) => !p);
    if (arrow === 'right') {
      setReverse(false);
      if (showAll) {
        setPage((p) => (p === Math.round(array?.length / boxes) ? 0 : p + 1));
      } else {
        setPage((p) =>
          p === Math.floor(array?.length / boxes) - 1 ? 0 : p + 1
        );
      }
    }
    if (arrow === 'left') {
      setReverse(true);
      setPage((p) => p - 1);
    }
  };
  const isRightArrow = !Boolean(array?.length <= boxes);
  const isLeftArrow = Boolean(page !== 0);

  const titleClick = () => {
    if (type === 'movie') return router.push(`/movies`);
    if (type === 'post') return router.push(`/posts`);
    if (type === 'board' || type === 'allBoards') return router.push(`/boards`);
  };
  return (
    <Cont className="slider">
      <Title onClick={titleClick}>
        <span>{title}</span>
      </Title>
      {isArray && (
        <Flex className="flex">
          {isLeftArrow && (
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
          {isRightArrow && (
            <Svg
              size="2rem"
              type="chev-right-arrow"
              onClick={() => ArrowClick('right')}
            />
          )}
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
