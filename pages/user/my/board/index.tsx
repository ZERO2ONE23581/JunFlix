import useSWR from 'swr';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../../../../styles/global';
import { IGetBoards } from '../../../../src/types/board';
import useUser from '../../../../src/libs/client/useUser';
import { Title } from '../../../../src/components/Layout/Title';
import { BoardList } from '../../../../src/components/Board/Read/Page/Boards';
import { BoardsPgBtns } from '../../../../src/components/Board/Read/Page/Boards/Btns';

const MyBoardsPage: NextPage = () => {
  const { loggedInUser } = useUser();
  const { data } = useSWR<IGetBoards>(`/api/user/my/boards`);
  return (
    <>
      <Title title={`${loggedInUser?.username}'s Boards`} />
      <Cont>
        <h1>{loggedInUser?.username}님의 보드</h1>
        <BoardList boards={data?.boards!} />
      </Cont>
      <BoardsPgBtns />
    </>
  );
};
export default MyBoardsPage;

const Cont = styled(Page)`
  h1 {
    font-size: 1.6rem;
    margin-left: 30px;
    margin-bottom: 15px;
  }
`;
