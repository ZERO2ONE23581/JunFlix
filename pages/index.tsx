import useSWR from 'swr';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../styles/global';
import { IGetBoards } from '../src/types/board';
import { BoardList } from '../src/components/Board/Read/List';
import { MovieAPI } from '../src/components/Movie';
import { HeadTitle } from '../src/components/Title/Head';

const Home: NextPage = () => {
  const { data } = useSWR<IGetBoards>(`/api/user/all/boards`);
  return (
    <>
      <HeadTitle title="HOME" />
      <Page>
        <BoardList boards={data?.boards!} />
        <MovieAPI type="trending" />
      </Page>
    </>
  );
};
export default Home;

const Const = styled(Page)``;
