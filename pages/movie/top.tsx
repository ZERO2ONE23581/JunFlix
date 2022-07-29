import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { MovieAPI } from '../../src/components/Movie';
import { HeadTitle } from '../../src/components/Title/Head';

const Top: NextPage = () => {
  return (
    <>
      <HeadTitle title="명작영화" />
      <Page>
        <MovieAPI type="top" />
      </Page>
    </>
  );
};
export default Top;
