import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { Movie } from '../../src/components/Movie';
import { HeadTitle } from '../../src/components/Layout/Head';

const TV: NextPage = () => {
  return (
    <>
      <HeadTitle title="드라마 콘텐츠" />
      <Page>
        <Movie type="tv" />
      </Page>
    </>
  );
};
export default TV;
