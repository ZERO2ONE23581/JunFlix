import type { NextPage } from 'next';
import { HeadTitle } from '../../src/components/Layout/Head';
import { Movie } from '../../src/components/Movie';
import { Page } from '../../styles/global';

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
