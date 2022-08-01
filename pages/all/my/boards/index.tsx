import useSWR from 'swr';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../../../../styles/global';
import { IGetBoards } from '../../../../src/types/board';
import useUser from '../../../../src/libs/client/useUser';
import { Title } from '../../../../src/components/Title';
import { HeadTitle } from '../../../../src/components/Title/Head';
import { Fixed } from '../../../../src/components/Fixed';
import { BoardList } from '../../../../src/components/Board/Read/List';

const MyBoard: NextPage = () => {
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
        <BoardList size={5} boards={data?.boards!} />
      </Cont>
      <Fixed type={{ isBoard: true, isPost: false }} />
    </>
  );
};
export default MyBoard;

const Cont = styled(Page)``;
