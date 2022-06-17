import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { Title } from '../../src/components/Layout/Title';
import { MovieInfo } from '../../src/components/Movie';

const TrendingContents: NextPage = () => {
  return (
    <>
      <Title title="인기 콘텐츠" />
      <Page>
        <MovieInfo type="trending" />
      </Page>
    </>
  );
};
export default TrendingContents;
