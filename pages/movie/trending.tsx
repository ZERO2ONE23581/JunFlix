import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { MovieAPI } from '../../src/components/Movie';
import { HeadTitle } from '../../src/components/Title/Head';

const Trending: NextPage = () => {
  return (
    <>
      <HeadTitle title="인기 콘텐츠" />
      <Page>
        <MovieAPI type="trending" />
      </Page>
    </>
  );
};
export default Trending;
