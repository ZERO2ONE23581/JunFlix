import { useState } from 'react';
import { MovieHover } from './hover';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { PostModal } from '../../../Post/Read/Each';
import { AnimatePresence, motion } from 'framer-motion';
import { Follow } from '../../../Board/Read/List/Board/Follow';
import Link from 'next/link';
import { NoAvatar } from '../../../Avatar/NoAvatar';
import { Info } from '../../../Board/Read/List/Board/Info';

interface IMovieSlider {
  array: [];
  type: string;
  reverse: boolean;
}
interface IData {
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
  content?: string | null;
  avatar?: string | null;
  genre?: string;
  user?: {
    username?: string;
  };
  UserID?: number;
  BoardID?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
interface IBgUrl {
  movie?: string;
  avatar?: string;
}
export const Boxes = ({ type, array, reverse }: IMovieSlider) => {
  const router = useRouter();
  const [query, setQuery] = useState({
    userId: 0,
    postId: 0,
    boardId: 0,
  });
  const [postModal, setPostModal] = useState(false);
  const handleClick = (id: number, userId: number, boardId: number) => {
    if (type === 'movie') return router.push(`/home/${id}`);
    if (type === 'post') {
      setQuery({ userId, boardId, postId: id });
      setPostModal(true);
    }
  };
  return (
    <>
      <AnimatePresence>
        {array?.map((data: IData) => (
          <Box
            key={data.id}
            custom={reverse}
            variants={boxVars}
            initial="initial"
            whileHover="hover"
            layoutId={data.id + ''}
            //
            type={type}
            className={type}
            length={array.length}
            avatar={data?.avatar! && data?.avatar!}
            moviebg={data?.backdrop_path && data?.backdrop_path}
            onClick={() => handleClick(data.id, data?.UserID!, data?.BoardID!)}
          >
            {type === 'movie' && <MovieHover data={data} />}
            {type === 'board' && (
              <>
                <Link
                  href={`/user/${data?.UserID}/board/${data?.id}/${data?.title}`}
                >
                  <a>
                    <BoardWrap>
                      <Follow userId={data?.UserID!} boardId={data?.id} />
                      <NoAvatar genre={data?.genre} avatar={data?.avatar!} />
                      <Info
                        title={data?.title!}
                        genre={data?.genre!}
                        userId={data?.UserID!}
                        avatar={data?.avatar!}
                        username={data?.user?.username!}
                      />
                    </BoardWrap>
                  </a>
                </Link>
              </>
            )}
          </Box>
        ))}
        {postModal && <PostModal setModal={setPostModal} query={query} />}
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
    scale: 1.5,
    transition: {
      delay: 0.2,
      duration: 0.3,
    },
  },
};
const BoardWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

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
  flex-direction: column;
  align-items: flex-end;
  /* border: ${(p) => p.type === 'board' && `1px solid grey`}; */
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
