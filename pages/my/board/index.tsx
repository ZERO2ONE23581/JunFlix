import type { NextPage } from 'next';
import useUser from '../../../src/libs/client/useUser';
import { Title } from '../../../src/components/Layout/Title';
import { BoardList } from '../../../src/components/Board/List';
import styled from '@emotion/styled';
import { Page } from '../../../styles/default';

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
