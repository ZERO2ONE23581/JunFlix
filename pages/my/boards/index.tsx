import useSWR from 'swr';
import type { NextPage } from 'next';
import useUser from '../../../src/libs/client/useUser';
import { IGetBoards } from '../../../src/types/board';
import { Title } from '../../../src/components/Layout/Title';
import { BoardList } from '../../../src/components/Board/BoardList';

const MyBoards: NextPage = () => {
  const { isloggedIn, loggedInUser } = useUser();
  const { data } = useSWR<IGetBoards>(isloggedIn && `/api/my/boards`);
  return (
    <>
      <Title title="나의 보드" />
      <BoardList
        myBoards={true}
        loggedInUser={loggedInUser}
        boards={data?.boards}
      />
    </>
  );
};
export default MyBoards;
