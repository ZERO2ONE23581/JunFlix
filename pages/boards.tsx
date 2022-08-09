import useSWR from 'swr';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../styles/global';
import { IGetBoards } from '../src/types/board';
import { Title } from '../src/components/Tools/Title';
import { HeadTitle } from '../src/components/Layout/Head';
import { BoardList } from '../src/components/Board/Read/List';
import { Fixed } from '../src/components/Tools/Button/Fixed';

const AllBoards: NextPage = () => {
  const { data } = useSWR<IGetBoards>(`/api/boards`);
  return (
    <>
      <HeadTitle title="All Boards" />
      <Cont>
        <Title kind="Boards" svg={{ type: 'board', size: '2rem' }} />
        <BoardList size={4} boards={data?.boards!} />
      </Cont>
      <Fixed type="board" />
    </>
  );
};
export default AllBoards;

const Cont = styled(Page)`
  .board-list {
    .board {
      min-height: 440px;
      .isOwner {
        top: 0px;
        right: -20px;
        position: absolute;
        fill: ${(p) => p.theme.color.logo};
      }
    }
  }
`;
