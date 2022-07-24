import useSWR from 'swr';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../../../../styles/global';
import { IGetBoards } from '../../../../src/types/board';
import { Title, TitleSign } from '../../../../src/components/Layout/Title';
import { BoardList } from '../../../../src/components/Board/Read/List';

const All_Boards: NextPage = () => {
  const { data } = useSWR<IGetBoards>(`/api/user/all/boards`);
  return (
    <>
      <Title title="All Boards" />
      <Cont>
        <TitleSign type="Boards" width="220px" svgSize="2rem" svg="board" />
        <BoardList boards={data?.boards!} />
      </Cont>
    </>
  );
};
export default All_Boards;

const Cont = styled(Page)`
  padding: 0 10% 5%;
`;
