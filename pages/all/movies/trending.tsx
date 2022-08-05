import type { NextPage } from 'next';
import { HeadTitle } from '../../../src/components/Layout/Head';
import { Movie } from '../../../src/components/Movie';
import { Page } from '../../../styles/global';

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
