import useSWR from 'swr';
import type { NextPage } from 'next';
import { BoardList } from '../../../src/components/Board/BoardList';
import { Title } from '../../../src/components/Layout/Title';
import useUser from '../../../src/libs/client/useUser';
import { IGetExistingBoards } from '../../../src/types/board';

const Select_MyBoards: NextPage = () => {
  const { loggedInUser } = useUser();
  const { data } = useSWR<IGetExistingBoards>(
    loggedInUser && `/api/user/${loggedInUser.id}/board`
  );
  return (
    <>
      <Title title="보드선택 페이지" />
      <BoardList
        selectBoard={true}
        loggedInUser={loggedInUser}
        boards={data?.boards}
      />
    </>
  );
};
export default Select_MyBoards;
