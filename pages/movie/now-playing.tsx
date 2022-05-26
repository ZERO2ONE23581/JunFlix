import type { NextPage } from 'next';
import { Title } from '../../src/components/Layout/parts/Title';
import { MovieInfo } from '../../src/components/Movie';

const News: NextPage = () => {
  return (
    <>
      <Title title="현재상영작" />
      <MovieInfo type="nowPlaying" />
    </>
  );
};
export default News;
