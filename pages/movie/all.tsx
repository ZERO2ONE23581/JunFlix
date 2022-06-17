import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { Title } from '../../src/components/Layout/Title';
import { MovieInfo } from '../../src/components/Movie';

const AllMovieNews: NextPage = () => {
  return (
    <>
      <Title title="영화뉴스" />
      <Page>
        <MovieInfo type="trending" />
        <MovieInfo type="nowPlaying" />
        <MovieInfo type="tvShows" />
        <MovieInfo type="upcoming" />
        <MovieInfo type="topRated" />
      </Page>
    </>
  );
};
export default AllMovieNews;
