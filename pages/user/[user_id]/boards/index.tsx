import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { IPage } from '../../../_app';
import { Page } from '../../../../styles/global';
import { Head_ } from '../../../../src/Tools/Title/Head';
import { PageTitle } from '../../../../src/Tools/Title/Page';
import { useUser } from '../../../../src/libs/client/useUser';
import { useGetBoards } from '../../../../src/libs/client/useBoards';
import { useGetQuickSaved } from '../../../../src/libs/client/usePosts';
import { BoardsGrid } from '../../../../src/components/Board/Read/Boards';
import { useLogin, useValidHost } from '../../../../src/libs/client/useLogin';

const UserBoards: NextPage<IPage> = ({ theme, mobile }) => {
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
        <BoardsGrid
          mobile={mobile}
          _data={{ theme, isBoard, boards, quickSaved, user_id }}
        />
      </Cont>
    </>
  );
};
export default UserBoards;

const Cont = styled(Page)``;
