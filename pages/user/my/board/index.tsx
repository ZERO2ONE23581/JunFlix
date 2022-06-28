import useSWR from 'swr';
import type { NextPage } from 'next';
import { Page } from '../../../../styles/global';
import { IGetBoards } from '../../../../src/types/board';
import useUser from '../../../../src/libs/client/useUser';
import { Title } from '../../../../src/components/Layout/Title';
import { BoardList } from '../../../../src/components/Board/Read/BoardList';

const MyBoards: NextPage = () => {
  const { loggedInUser } = useUser();
  const { data } = useSWR<IGetBoards>(`/api/user/my/boards`);
  return (
    <>
      <Title title={`${loggedInUser?.username}'s Boards`} />
      <Page>
        <h1>{loggedInUser?.username}님의 모든 보드</h1>
        <BoardList boards={data?.boards!} />
      </Page>
    </>
  );
};
export default MyBoards;
