import type { NextPage } from 'next';
import { HeadTitle } from '../../src/components/Layout/Head';
import { Movie } from '../../src/components/Movie';
import { Page } from '../../styles/global';

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
