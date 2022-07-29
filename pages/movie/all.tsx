import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { MovieAPI } from '../../src/components/Movie';
import { HeadTitle } from '../../src/components/Title/Head';

const All: NextPage = () => {
  return (
    <>
      <HeadTitle title="영화정보" />
      <Page>
        <MovieAPI type="trending" />
        <MovieAPI type="now" />
        <MovieAPI type="upcoming" />
        <MovieAPI type="tv" />
        <MovieAPI type="top" />
      </Page>
    </>
  );
};
export default All;
