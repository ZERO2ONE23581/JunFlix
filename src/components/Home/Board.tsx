import useSWR from 'swr';
import { Title } from '../Title';
import { IGetBoards } from '../../types/board';
import { BoardList } from '../Board/Read/List';

export const Board = () => {
  const { data } = useSWR<IGetBoards>(`/api/user/all/boards`);
  return (
    <>
      {/* <Title kind="Boards" svg={{ type: 'board', size: '2rem' }} /> */}
      <BoardList boards={data?.boards!} isMyPage />
    </>
  );
};
