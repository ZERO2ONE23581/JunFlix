import type { NextPage } from 'next';
import { Title } from '../../src/components/Layout/parts/Title';
import { MovieInfo } from '../../src/components/Movie';

const News: NextPage = () => {
  return (
    <>
      <Title title="개봉예정영화" />
      <MovieInfo type="upcoming" />
    </>
  );
};
export default News;
