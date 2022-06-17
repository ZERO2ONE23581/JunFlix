import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { Title } from '../../src/components/Layout/Title';
import { MovieInfo } from '../../src/components/Movie';

const UpcomingMovies: NextPage = () => {
  return (
    <>
      <Title title="개봉예정영화" />
      <Page>
        <MovieInfo type="upcoming" />
      </Page>
    </>
  );
};
export default UpcomingMovies;
