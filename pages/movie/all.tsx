import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { MovieAPI } from '../../src/components/Movie';
import { HeadTitle } from '../../src/components/Layout/Head';
import { MovieTitle } from '../../src/components/Movie/Title';
import styled from '@emotion/styled';

const All: NextPage = () => {
  return (
    <>
      <HeadTitle title="영화정보" />
      <Cont>
        <MovieTitle type="trending" />
        <MovieAPI type="trending" />

        <MovieTitle type="now" />
        <MovieAPI type="now" />

        <MovieTitle type="upcoming" />
        <MovieAPI type="upcoming" />

        <MovieTitle type="tv" />
        <MovieAPI type="tv" />

        <MovieTitle type="top" />
        <MovieAPI type="top" />
      </Cont>
    </>
  );
};
export default All;

const Cont = styled(Page)`
  .movie-title {
    margin-top: 20px;
    :first-of-type {
      margin-top: 0;
    }
  }
`;
