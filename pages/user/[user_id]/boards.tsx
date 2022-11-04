import type { NextPage } from 'next';
import { BoardPage } from '../../all/boards';
import { HeadTitle } from '../../../src/Tools/head_title';
import { useUser } from '../../../src/libs/client/useUser';
import { useGetBoards } from '../../../src/libs/client/useBoards';
import { BoardsGrid } from '../../../src/components/Board/Read/Grid';
import { useGetQuickSaved } from '../../../src/libs/client/usePosts';
import { PageHeading } from '../../../src/components/Board/Read/BoardTitle';

const MyBoards: NextPage<{ theme: boolean }> = ({ theme }) => {
  const { user_id, username } = useUser();
  const { boards, isBoard } = useGetBoards(user_id!);
  const { posts: quickSaved } = useGetQuickSaved(user_id!);
  return (
    <>
      <HeadTitle title={`${username}'s Board`} />
      <BoardPage>
        <PageHeading type="board" theme={theme} detail={{ my: true }} />
        <BoardsGrid _data={{ theme, isBoard, boards, quickSaved, user_id }} />
      </BoardPage>
    </>
  );
};
export default MyBoards;
