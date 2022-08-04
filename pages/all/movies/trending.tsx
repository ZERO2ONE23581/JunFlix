import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { Movie } from '../../src/components/Movie';
import { HeadTitle } from '../../src/components/Layout/Head';

const Trending: NextPage = () => {
  return (
    <>
      <HeadTitle title="인기 콘텐츠" />
      <Page>
        <Movie type="trending" />
      </Page>
    </>
  );
};
export default Trending;
