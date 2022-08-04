import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { Movie } from '../../src/components/Movie';
import { HeadTitle } from '../../src/components/Layout/Head';

const Top: NextPage = () => {
  return (
    <>
      <HeadTitle title="명작영화" />
      <Page>
        <Movie type="top" />
      </Page>
    </>
  );
};
export default Top;
