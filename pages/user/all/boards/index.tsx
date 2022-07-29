import useSWR from 'swr';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../../../../styles/global';
import { IGetBoards } from '../../../../src/types/board';
import { Title } from '../../../../src/components/Title';
import { BoardList } from '../../../../src/components/Board/Read/List';
import { HeadTitle } from '../../../../src/components/Title/Head';

const All_Boards: NextPage = () => {
  const { data } = useSWR<IGetBoards>(`/api/user/all/boards`);
  return (
    <>
      <HeadTitle title="All Boards" />
      <Cont>
        <Title kind="Boards" svg={{ type: 'board', size: '2rem' }} />
        <BoardList boards={data?.boards!} />
      </Cont>
    </>
  );
};
export default All_Boards;

const Cont = styled(Page)`
  padding: 0 10% 5%;
`;
