import type { NextPage } from 'next';
import { Title } from '../../src/components/Layout/parts/Title';
import { MovieInfo } from '../../src/components/Movie';

const News: NextPage = () => {
  return (
    <>
      <Title title="드라마 콘텐츠" />
      <MovieInfo type="tvShows" />
    </>
  );
};
export default News;
