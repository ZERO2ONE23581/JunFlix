import { Svg } from '../../Svg';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';

interface IMovieModal {
  data: {
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
  };
  movieId: number;
  isBoxClicked: boolean;
}
export const MovieModal = ({ data, movieId, isBoxClicked }: IMovieModal) => {
  const router = useRouter();
  const Title = data?.original_name ? data?.original_name : data?.title;
  return (
    <>
      <AnimatePresence>
        {data && isBoxClicked && (
          <>
            <Cont
              exit="exit"
              initial="initial"
              animate="animate"
              variants={modalVar}
              layoutId={movieId + ''}
              transition={{ type: 'tween', duration: 0.4 }}
            >
              <MovieInfo
                bg={`https://image.tmdb.org/t/p/original${data.backdrop_path!}`}
              >
                <div className="bg-title-wrap">
                  <Svg
                    size="2rem"
                    type="close"
                    onClick={() => router.replace(`/home/0`)}
                  />
                  <h1>{Title}</h1>
                </div>
                <ul>
                  <li>
                    <span>Language (언어):</span>
                    <span>{data.original_language?.toUpperCase()}</span>
                  </li>
                  <li>
                    <span>Release Date (개봉일):</span>
                    <span>{data.release_date}</span>
                  </li>
                  {data.vote_average && (
                    <li>
                      <span>Rate (평점):</span>
                      <span>{Math.round(data.vote_average * 100) / 100}</span>
                    </li>
                  )}
                  <li>
                    <span>Overview (줄거리):</span>
                    <span className="overview">{data.overview}</span>
                  </li>
                </ul>
              </MovieInfo>
            </Cont>
            <Overlay
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => router.replace(`/home/0`)}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};
const Cont = styled(motion.article)`
  top: 20px;
  left: 0;
  right: 0;
  z-index: 100;
  margin: 0 auto;
  position: fixed;
  width: 45vw;
  max-height: 700px;
  overflow-y: auto;
  border-radius: 5px;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
  ::-webkit-scrollbar {
    display: none;
  }
`;

const MovieInfo = styled.div<{ bg: string }>`
  .bg-title-wrap {
    display: flex;
    min-height: 440px;
    position: relative;
    align-items: flex-end;
    background: ${(prev) =>
      `linear-gradient(to top, black, transparent), url(${prev.bg}) center / cover no-repeat`};
    .close {
      top: 20px;
      right: 20px;
      position: absolute;
    }
    h1 {
      color: white;
      font-size: 2rem;
      font-weight: 400;
      text-align: center;
      width: fit-content;
      padding-left: 30px;
      padding-bottom: 20px;
    }
  }
  ul {
    padding: 20px;
    font-size: 1.2rem;
    li {
      margin-bottom: 10px;
      span {
        :first-of-type {
          margin-left: 5px;
          margin-right: 10px;
        }
        :nth-of-type(2) {
          opacity: 0.8;
          font-style: italic;
          color: ${(p) => p.theme.color.logo};
        }
      }
      .overview {
        font-size: 1.3rem;
        line-height: 28px;
      }
    }
  }
`;
const Overlay = styled(motion.div)`
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 99;
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
`;
const modalVar = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};
