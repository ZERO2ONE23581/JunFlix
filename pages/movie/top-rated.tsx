import type { NextPage } from 'next';
import { Title } from '../../src/components/Layout/Title';
import { MovieInfo } from '../../src/components/Movie';
import { Page } from '../../styles/global';

const TopRatedMovies: NextPage = () => {
  return (
    <>
      <Title title="명작영화" />
      <Page>
        <MovieInfo type="topRated" />
      </Page>
    </>
  );
};
export default TopRatedMovies;
