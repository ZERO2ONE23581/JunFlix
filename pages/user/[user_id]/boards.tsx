import type { NextPage } from 'next';
import { Head_ } from '../../../src/Tools/head_title';
import { useUser } from '../../../src/libs/client/useUser';
import { useGetBoards } from '../../../src/libs/client/useBoards';
import { PageHeading } from '../../../src/components/PageHeading';
import { BoardsGrid } from '../../../src/components/Board/Read/Grid';
import { useGetQuickSaved } from '../../../src/libs/client/usePosts';
import styled from '@emotion/styled';
import { Page } from '../../../styles/global';

const UserBoards: NextPage<{ theme: boolean }> = ({ theme }) => {
  const { user_id, username } = useUser();
  const { boards, isBoard } = useGetBoards(user_id!);
  const { posts: quickSaved } = useGetQuickSaved(user_id);
  return (
    <>
      <Head_ title={`${username}'s Board`} />
      <Cont>
        <PageHeading type="user_board" theme={theme} />
        <BoardsGrid _data={{ theme, isBoard, boards, quickSaved, user_id }} />
      </Cont>
    </>
  );
};
export default UserBoards;

const Cont = styled(Page)`
  padding: 0 8rem;
`;
