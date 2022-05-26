import type { NextPage } from 'next';
import { Title } from '../../src/components/Layout/parts/Title';
import { MovieInfo } from '../../src/components/Movie';

const News: NextPage = () => {
  return (
    <>
      <Title title="영화뉴스" />
      <MovieInfo type="trending" />
      <MovieInfo type="nowPlaying" />
      <MovieInfo type="tvShows" />
      <MovieInfo type="upcoming" />
      <MovieInfo type="topRated" />
    </>
  );
};
export default News;
