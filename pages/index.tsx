import useSWR from 'swr';
import type { NextPage } from 'next';
import { Page } from '../styles/global';
import { IGetBoards } from '../src/types/board';
import { MovieInfo } from '../src/components/Movie';
import { Title } from '../src/components/Layout/Title';
import { BoardList } from '../src/components/Board/Read/List';

const Home: NextPage = () => {
  const { data } = useSWR<IGetBoards>(`/api/user/all/boards`);
  return (
    <>
      <Title title="HOME" />
      <Page>
        <BoardList boards={data?.boards!} />
        <MovieInfo type="trending" />
      </Page>
    </>
  );
};
export default Home;
