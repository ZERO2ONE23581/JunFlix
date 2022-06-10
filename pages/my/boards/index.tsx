import type { NextPage } from 'next';
import useUser from '../../../src/libs/client/useUser';
import { Title } from '../../../src/components/Layout/Title';
import { BoardList } from '../../../src/components/Board/List';

const MyBoards: NextPage = () => {
  const { isloggedIn } = useUser();
  return (
    <>
      <Title title="나의 보드" />
      <BoardList isMyBoards={isloggedIn} />
    </>
  );
};
export default MyBoards;
