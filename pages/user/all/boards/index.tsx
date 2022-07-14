import useSWR from 'swr';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../../../../styles/global';
import { IGetBoards } from '../../../../src/types/board';
import { Title, TitleSign } from '../../../../src/components/Layout/Title';
import { BoardList } from '../../../../src/components/Board/Read/Page/Boards';

const AllBoardsPage: NextPage = () => {
  const { data } = useSWR<IGetBoards>(`/api/user/all/boards`);
  return (
    <>
      <Title title="All Boards" />
      <Page>
        <TitleSign type="Boards" />
        <BoardList boards={data?.boards!} />
      </Page>
    </>
  );
};
export default AllBoardsPage;

const Cont = styled(Page)``;
