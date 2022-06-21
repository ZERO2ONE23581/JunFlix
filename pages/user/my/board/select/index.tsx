import type { NextPage } from 'next';
import useUser from '../../../../../src/libs/client/useUser';
import { Title } from '../../../../../src/components/Layout/Title';
import { BoardList } from '../../../../../src/components/User/Board/List';
import { Page } from '../../../../../styles/global';

const BoardSelect: NextPage = () => {
  const { isLoggedIn } = useUser();
  return (
    <>
      <Title title="보드 선택하기" />
      <Page>
        <BoardList isMyBoards={isLoggedIn} isSelect={true} />
      </Page>
    </>
  );
};
export default BoardSelect;
