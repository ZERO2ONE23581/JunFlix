import useSWR from 'swr';
import type { NextPage } from 'next';
import { Page } from '../../../../styles/global';
import { IGetBoards } from '../../../../src/types/board';
import { Title } from '../../../../src/components/Layout/Title';
import { BoardList } from '../../../../src/components/Board/Read/BoardList';

const AllBoards: NextPage = () => {
  const { data } = useSWR<IGetBoards>(`/api/user/all/boards`);
  return (
    <>
      <Title title="All Boards" />
      <Page>
        <h1>모든 보드</h1>
        <BoardList boards={data?.boards!} />
      </Page>
    </>
  );
};
export default AllBoards;
