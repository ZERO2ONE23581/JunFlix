import useSWR from 'swr';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../../../../styles/global';
import { IGetBoards } from '../../../../src/types/board';
import useUser from '../../../../src/libs/client/useUser';
import { BoardList } from '../../../../src/components/Board/Read/List';
import { FixedBtn } from '../../../../src/components/Post/Read/FixedBtn';
import { HeadTitle } from '../../../../src/components/Title/Head';
import { Title } from '../../../../src/components/Title';

const MyBoardsPage: NextPage = () => {
  const { loggedInUser } = useUser();
  const { data } = useSWR<IGetBoards>(`/api/user/my/boards`);
  return (
    <>
      <HeadTitle title={`${loggedInUser?.username}'s Boards`} />
      <Cont>
        <Title
          kind="Boards"
          name={loggedInUser?.username!}
          svg={{ type: 'board', size: '2rem' }}
        />
        <BoardList boards={data?.boards!} />
      </Cont>
      <FixedBtn />
    </>
  );
};
export default MyBoardsPage;

const Cont = styled(Page)`
  padding-top: 0;
`;
