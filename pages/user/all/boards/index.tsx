import useSWR from 'swr';
import type { NextPage } from 'next';
import { Page } from '../../../../styles/global';
import { IGetBoards } from '../../../../src/types/board';
import { Title } from '../../../../src/components/Layout/Title';
import { BoardList } from '../../../../src/components/Board/Read/Page/Boards';
import { BoardsPgBtns } from '../../../../src/components/Board/Read/Page/Boards/Btns';

const AllBoardsPage: NextPage = () => {
  const { data } = useSWR<IGetBoards>(`/api/user/all/boards`);
  return (
    <>
      <Title title="All Boards" />
      <Page>
        <BoardList boards={data?.boards!} />
      </Page>
      <BoardsPgBtns />
    </>
  );
};
export default AllBoardsPage;
