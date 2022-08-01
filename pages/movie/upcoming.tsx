import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { MovieAPI } from '../../src/components/Movie';
import { HeadTitle } from '../../src/components/Layout/Head';

const Upcoming: NextPage = () => {
  return (
    <>
      <HeadTitle title="개봉예정영화" />
      <Page>
        <MovieAPI type="upcoming" />
      </Page>
    </>
  );
};
export default Upcoming;
