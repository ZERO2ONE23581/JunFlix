import type { NextPage } from 'next';
import { Title } from '../../src/components/Layout/parts/Title';
import { NowPlaying } from '../../src/components/News/NowPlaying';

const News: NextPage = () => {
  return (
    <>
      <Title title="영화뉴스" />
      <NowPlaying />
    </>
  );
};
export default News;
