import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { MovieInfo } from '../../src/components/Movie';
import { Title } from '../../src/components/Layout/Title';

const TvShows: NextPage = () => {
  return (
    <>
      <Title title="드라마 콘텐츠" />
      <Page>
        <MovieInfo type="tvShows" />
      </Page>
    </>
  );
};
export default TvShows;
