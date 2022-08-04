import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../../styles/global';
import { Movie } from '../../../src/components/Movie';
import { HeadTitle } from '../../../src/components/Layout/Head';

const All: NextPage = () => {
  return (
    <>
      <HeadTitle title="영화" />
      <Cont>
        <Movie type="trending" />
        <Movie type="now" />
        <Movie type="upcoming" />
        <Movie type="tv" />
        <Movie type="top" />
      </Cont>
    </>
  );
};
export default All;

const Cont = styled(Page)``;
