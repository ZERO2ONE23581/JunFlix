import type { NextPage } from 'next';
import { HeadTitle } from '../../src/components/Layout/Head';
import { Movie } from '../../src/components/Movie';
import { Page } from '../../styles/global';

const Upcoming: NextPage = () => {
  return (
    <>
      <HeadTitle title="개봉예정영화" />
      <Page>
        <Movie type="upcoming" />
      </Page>
    </>
  );
};
export default Upcoming;
