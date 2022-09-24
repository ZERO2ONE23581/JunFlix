import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { HeadTitle } from '../../src/components/Layout/Head';
import { MovieSlider } from '../../src/components/Tools/Slider';

const Upcoming: NextPage = () => {
  return (
    <>
      <HeadTitle title="개봉예정영화" />
      <Page>
        <MovieSlider type="upcoming" />
      </Page>
    </>
  );
};
export default Upcoming;
