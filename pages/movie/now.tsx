import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { MovieAPI } from '../../src/components/Movie';
import { HeadTitle } from '../../src/components/Title/Head';

const NowPlaying: NextPage = () => {
  return (
    <>
      <HeadTitle title="현재상영작" />
      <Page>
        <MovieAPI type="now" />
      </Page>
    </>
  );
};
export default NowPlaying;
