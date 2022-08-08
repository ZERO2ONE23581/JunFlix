import type { NextPage } from 'next';
import { HeadTitle } from '../../../src/components/Layout/Head';
import { Movie } from '../../../src/components/Movie';
import { Page } from '../../../styles/global';

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