import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../../../../styles/global';
import { Head_ } from '../../../../src/Tools/Title/Head';
import { useUser } from '../../../../src/libs/client/useUser';
import { useLogin, useValidHost } from '../../../../src/libs/client/useLogin';
import { useGetBoards } from '../../../../src/libs/client/useBoards';
import { PageTitle } from '../../../../src/Tools/Title/Page';
import { BoardsGrid } from '../../../../src/components/Board/Read/Boards';
import { useGetQuickSaved } from '../../../../src/libs/client/usePosts';

const UserBoards: NextPage<{ theme: boolean }> = ({ theme }) => {
  useLogin();
  useValidHost('boards');
  const { user_id, username } = useUser();
  const { boards, isBoard } = useGetBoards(user_id!);
  const { posts: quickSaved } = useGetQuickSaved(user_id);
  return (
    <>
      <Head_ title={`${username}'s Board`} />
      <Cont>
        <PageTitle type="user_board" theme={theme} />
        <BoardsGrid _data={{ theme, isBoard, boards, quickSaved, user_id }} />
      </Cont>
    </>
  );
};
export default UserBoards;

const Cont = styled(Page)`
  padding: 0 8rem;
`;
