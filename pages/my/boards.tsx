import useSWR from 'swr';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../../styles/global';
import { IGetBoards } from '../../src/types/board';
import useUser from '../../src/libs/client/useUser';
import { Title } from '../../src/components/Tools/Title';
import { HeadTitle } from '../../src/components/Layout/Head';
import { useNeedLogin } from '../../src/libs/client/useTools';
import { Fixed } from '../../src/components/Tools/Button/Fixed';
import { BoardList } from '../../src/components/Board/Read/List';

const MyBoard: NextPage = () => {
  useNeedLogin();
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
        <BoardList size={4} boards={data?.boards!} />
      </Cont>
      <Fixed type="board" />
    </>
  );
};
export default MyBoard;

const Cont = styled(Page)`
  .isOwner {
    top: 0px;
    right: -20px;
    position: absolute;
    fill: ${(p) => p.theme.color.logo};
  }
`;
