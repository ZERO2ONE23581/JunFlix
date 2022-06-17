import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { Title } from '../../src/components/Layout/Title';
import { MovieInfo } from '../../src/components/Movie';

const NowPlayingMovies: NextPage = () => {
  return (
    <>
      <Title title="현재상영작" />
      <Page>
        <MovieInfo type="nowPlaying" />
      </Page>
    </>
  );
};
export default NowPlayingMovies;
