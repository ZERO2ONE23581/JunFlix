import type { NextPage } from 'next';
import { BoardList } from '../../../../src/components/Board/List';
import useUser from '../../../../src/libs/client/useUser';
import { Title } from '../../../../src/components/Layout/Title';

const BoardSelect: NextPage = () => {
  const { isloggedIn } = useUser();
  return (
    <>
      <Title title="보드 선택하기" />
      <BoardList isMyBoards={isloggedIn} isSelect={true} />
    </>
  );
};
export default BoardSelect;
