import useSWR from 'swr';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../../../../styles/global';
import { IGetBoards } from '../../../../src/types/board';
import useUser from '../../../../src/libs/client/useUser';
import { Title, TitleSign } from '../../../../src/components/Layout/Title';
import { BoardList } from '../../../../src/components/Board/Read/Page/Boards';
import { PageBtns } from '../../../../src/components/Board/Read/Page/Boards/Btns';

const MyBoardsPage: NextPage = () => {
  const { loggedInUser } = useUser();
  const { data } = useSWR<IGetBoards>(`/api/user/my/boards`);
  return (
    <>
      <Title title={`${loggedInUser?.username}'s Boards`} />
      <Cont>
        <TitleSign type="보드" name={loggedInUser?.username!} />
        <BoardList boards={data?.boards!} />
      </Cont>
      <PageBtns />
    </>
  );
};
export default MyBoardsPage;

const Cont = styled(Page)`
  padding-top: 0;
`;
