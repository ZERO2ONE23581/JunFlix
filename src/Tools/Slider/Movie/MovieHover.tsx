import { Svg } from '../../Svg';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { MovieInfo } from './movieInfo';
import { useEffect, useState } from 'react';
import { Flex } from '../../../../styles/global';
import { ITheme } from '../../../../styles/theme';

interface IMovieHover extends ITheme {
  data: {
    id: number;
    title?: string;
    overview?: string;
    poster_path?: string;
    vote_average?: number;
    release_date?: string;
    backdrop_path?: string;
    original_name?: string;
    original_title?: string;
    original_language?: string;
  };
}
export const MovieHover = ({ data, theme }: IMovieHover) => {
  const router = useRouter();
  const movie_id = data.id!;
  const date = data.release_date!;
  const rate = data.vote_average!;
  const [title, setTitle] = useState('');
  const [sliced, setSliced] = useState(title);
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
    <Cont>
      <Front variants={{ hover: { opacity: 0 } }}>
        <h1>{sliced}</h1>
      </Front>
      <Hovered variants={{ hover: { opacity: 1 } }}>
        <Flex className="title">
          <h2>{title}</h2>
          <Svg
            theme={theme}
            type="caret-down"
            onClick={() => router.replace(`/home/${movie_id}`)}
          />
        </Flex>
        <MovieInfo _data={{ theme, movie_id, date, rate }} />
      </Hovered>
    </Cont>
  );
};
const Cont = styled(Flex)`
  opacity: 1;
  font-weight: 500;
  position: relative;
  align-items: flex-end;
`;
const Front = styled(Flex)`
  padding: 8px;
  opacity: 0.5;
  font-size: 1.3rem;
  margin-bottom: 12px;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
`;
const Hovered = styled(Flex)`
  bottom: 0;
  opacity: 0;
  position: absolute;
  flex-direction: column-reverse;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
  > .title {
    gap: 0.2rem;
    //border: 2px solid lightblue;
    h2 {
      max-width: 70%;
      font-size: 1rem;
      width: fit-content;
      text-align: center;
      //border: 2px solid lightblue;
    }
  }
`;
