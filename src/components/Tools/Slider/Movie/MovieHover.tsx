import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { MovieInfo } from './movieInfo';

interface IMovieHover {
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
}
export const MovieHover = ({ data }: IMovieHover) => {
  const [title, setTitle] = useState('');
  const [sliced, setSliced] = useState(title);
  const isEng = Boolean(data.original_language === 'en');

  useEffect(() => {
    if (data) {
      if (data.title) setTitle(data.title);
      if (data.original_title) setTitle(data.original_title);
      if (data.original_name) setTitle(data.original_name);
      if (title.length <= 10) setSliced(title);
      if (title.length > 10) setSliced(title.slice(0, 8) + '...');
    }
  }, [data, setTitle, setSliced, title]);

  return (
    <>
      {data && (
        <Cont>
          <Original className="original" variants={{ hover: { opacity: 0 } }}>
            <h1>{sliced}</h1>
          </Original>

          <Hovered
            isEng={isEng}
            className="hover"
            variants={{ hover: { opacity: 1 } }}
          >
            <h2>{title}</h2>
            <MovieInfo
              movieId={data.id}
              date={data.release_date}
              rate={data.vote_average}
            />
          </Hovered>
        </Cont>
      )}
    </>
  );
};
const Cont = styled(motion.article)`
  opacity: 1;
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  font-weight: 500;
  text-align: center;
  position: relative;
`;
const Original = styled(motion.div)`
  width: 100%;
  opacity: 0.5;
  padding: 8px;
  font-size: 1.2rem;
  margin-bottom: 12px;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
`;
const Hovered = styled(motion.div)<{ isEng: boolean }>`
  opacity: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  height: fit-content;
  position: absolute;
  flex-direction: column-reverse;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
  h2 {
    padding: 10px;
    font-size: 1rem;
    text-align: center;
    font-size: ${(p) => (!p.isEng ? '0.9rem' : '1rem')};
  }
`;
