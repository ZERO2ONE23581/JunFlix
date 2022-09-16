import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { HeadTitle } from '../../src/components/Layout/Head';
import { MovieSlider } from '../../src/components/Tools/Slider/movie';

const Movies: NextPage = () => {
  return (
    <>
      <HeadTitle title="영화" />
      <Cont>
        <MovieSlider type="trending" />
        <MovieSlider type="now" />
        <MovieSlider type="tv" />
        <MovieSlider type="upcoming" />
        <MovieSlider type="top" />
      </Cont>
    </>
  );
};
export default Movies;

const Cont = styled(Page)`
  padding: 10px 20px 100px;
  gap: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
