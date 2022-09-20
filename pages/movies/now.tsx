import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { HeadTitle } from '../../src/components/Layout/Head';
import { MovieSlider } from '../../src/components/Tools/Slider/Movie';

const NowPlaying: NextPage = () => {
  return (
    <>
      <HeadTitle title="현재상영작" />
      <Page>
        <MovieSlider type="now" />
      </Page>
    </>
  );
};
export default NowPlaying;
