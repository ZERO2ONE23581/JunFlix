import type { NextPage } from 'next';
import { BoardPage } from '../../../styles/boards';
import { HeadTitle } from '../../../src/Tools/head_title';
import { useUser } from '../../../src/libs/client/useUser';
import { FixedBtns } from '../../../src/Tools/Button/Fixed';
import { PageTitle } from '../../../src/Tools/Title/Page_Title';
import { useGetBoards } from '../../../src/libs/client/useBoards';
import { BoardsGrid } from '../../../src/components/Board/Read/Grid';

const MyBoards: NextPage<{ theme: boolean }> = ({ theme }) => {
  const { user_id, username } = useUser();
  const { boards, isBoard } = useGetBoards(user_id!);
  return (
    <>
      <HeadTitle title={`${username}'s Board`} />
      <BoardPage>
        <PageTitle type="board" theme={theme} detail={{ my: true }} />
        <BoardsGrid boards={boards} isBoard={isBoard} theme={theme} />
      </BoardPage>
      <FixedBtns theme={theme} type="board" />
    </>
  );
};
export default MyBoards;
