import type { NextPage } from 'next';
import { IPage } from '../../../_app';
import { PostPage } from '../../../../styles/post';
import { Head_ } from '../../../../src/Tools/Title/Head';
import { PageTitle } from '../../../../src/Tools/Title/Page';
import { useUser } from '../../../../src/libs/client/useUser';
import { useResponsive } from '../../../../src/libs/client/useTools';
import { useGetBoards } from '../../../../src/libs/client/useBoards';
import { useGetQuickSaved } from '../../../../src/libs/client/usePosts';
import { BoardsGrid } from '../../../../src/components/BoardsGrid';
import { useLogin, useValidHost } from '../../../../src/libs/client/useLogin';

const UserBoards: NextPage<IPage> = ({ theme }) => {
  useLogin();
  useValidHost('boards');
  const { isDesk } = useResponsive();
  const { user_id, username } = useUser();
  const { boards, isBoard } = useGetBoards(user_id!);
  const { posts: quickSaved } = useGetQuickSaved(user_id);
  return (
    <>
      <Head_ title={`${username}'s Board`} />
      <PostPage isDesk={isDesk}>
        <PageTitle type="user_board" theme={theme} />
        <BoardsGrid _data={{ theme, isBoard, boards, quickSaved, user_id }} />
      </PostPage>
    </>
  );
};
export default UserBoards;
