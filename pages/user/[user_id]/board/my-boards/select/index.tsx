import useSWR from 'swr';
import type { NextPage } from 'next';
import { IGetBoards } from '../../../../../../src/types/board';
import useUser from '../../../../../../src/libs/client/useUser';
import { Title } from '../../../../../../src/components/Layout/Title';
import { BoardList } from '../../../../../../src/components/Board/BoardList';

const My_Boards: NextPage = () => {
  const { isloggedIn, loggedInUser } = useUser();
  const { data } = useSWR<IGetBoards>(
    loggedInUser && `/api/user/${loggedInUser.id}/board/my_boards`
  );
  return (
    <>
      <Title title="보드 선택하기" />
      {isloggedIn && data?.ok && data?.boards && (
        <BoardList
          selectBoard={true}
          boards={data.boards}
          loggedInUser={loggedInUser}
        />
      )}
    </>
  );
};
export default My_Boards;
