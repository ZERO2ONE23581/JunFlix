import type { NextPage } from 'next';
import useUser from '../../../src/libs/client/useUser';
import { Title } from '../../../src/components/Layout/Title';
import { BoardList } from '../../../src/components/Board/List';
import styled from '@emotion/styled';

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

export const Page = styled.section`
  height: 100vh;
  padding: 20px 10%;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 10px;
  }
`;
