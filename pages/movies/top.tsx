import type { NextPage } from 'next';
import { HeadTitle } from '../../src/components/Layout/Head';
import { MovieSlider } from '../../src/components/Tools/Slider';
import { Page } from '../../styles/global';

const Top: NextPage = () => {
  return (
    <>
      <HeadTitle title="명작영화" />
      <Page>
        <MovieSlider type="top" />
      </Page>
    </>
  );
};
export default Top;
