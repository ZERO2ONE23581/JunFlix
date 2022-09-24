import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { HeadTitle } from '../../src/components/Layout/Head';
import { MovieSlider } from '../../src/components/Tools/Slider';

const TV: NextPage = () => {
  return (
    <>
      <HeadTitle title="드라마 콘텐츠" />
      <Page>
        <MovieSlider type="tv" />
      </Page>
    </>
  );
};
export default TV;
