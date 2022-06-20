import type { NextPage } from 'next';
import { Page } from '../../../../styles/global';
import useUser from '../../../../src/libs/client/useUser';
import { Title } from '../../../../src/components/Layout/Title';
import { BoardList } from '../../../../src/components/User/Board/List';

const MyBoards: NextPage = () => {
  const { loggedInUser } = useUser();
  return (
    <>
      <Title title="나의 보드" />
      <Page>
        <h1>{loggedInUser?.username}'s Boards</h1>
        <BoardList isMyBoards={Boolean(loggedInUser)} />
      </Page>
    </>
  );
};
export default MyBoards;
