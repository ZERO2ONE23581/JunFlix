import type { NextPage } from 'next';
import { Title } from '../../src/components/Layout/Title';
import { MovieInfo } from '../../src/components/Movie';

const News: NextPage = () => {
  return (
    <>
      <Title title="명작영화" />
      <MovieInfo type="topRated" />
    </>
  );
};
export default News;
