import useSWR from 'swr';
import styled from '@emotion/styled';
import { Page } from '../../../styles/global';
import { BoardList } from '../Board/Read/List';
import { IGetBoards } from '../../types/board';

export const Boards = () => {
  const { data } = useSWR<IGetBoards>(`/api/user/all/boards`);
  return (
    <Cont>
      <BoardList size={5} boards={data?.boards!} isMyPage />
    </Cont>
  );
};
const Cont = styled(Page)`
  min-height: 100%;
  padding-top: 50px;
  padding-bottom: 100px;
  .board-list {
    .board {
      min-height: 200px;
    }
  }
`;
