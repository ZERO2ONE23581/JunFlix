import useSWR from 'swr';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../../../styles/global';
import { IGetBoards } from '../../../src/types/board';
import { Title } from '../../../src/components/Tools/Title';
import { HeadTitle } from '../../../src/components/Layout/Head';
import { Fixed } from '../../../src/components/Tools/Button/Fixed';
import { BoardList } from '../../../src/components/Board/Read/List';

const AllBoards: NextPage = () => {
  const { data } = useSWR<IGetBoards>(`/api/user/all/boards`);
  return (
    <>
      <HeadTitle title="All Boards" />
      <Cont>
        <Title kind="Boards" svg={{ type: 'board', size: '2rem' }} />
        <BoardList size={5} boards={data?.boards!} />
      </Cont>
      <Fixed type="board" />
    </>
  );
};
export default AllBoards;

const Cont = styled(Page)``;
