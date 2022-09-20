import type { NextPage } from 'next';
import { HeadTitle } from '../../src/components/Layout/Head';
import { MovieSlider } from '../../src/components/Tools/Slider/Movie';
import { Page } from '../../styles/global';

const Trending: NextPage = () => {
  return (
    <>
      <HeadTitle title="인기 콘텐츠" />
      <Page>
        <MovieSlider type="trending" />
      </Page>
    </>
  );
};
export default Trending;
