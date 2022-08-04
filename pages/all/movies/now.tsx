import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { Movie } from '../../src/components/Movie';
import { HeadTitle } from '../../src/components/Layout/Head';

const NowPlaying: NextPage = () => {
  return (
    <>
      <HeadTitle title="현재상영작" />
      <Page>
        <Movie type="now" />
      </Page>
    </>
  );
};
export default NowPlaying;
