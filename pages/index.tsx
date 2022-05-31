import useSWR from 'swr';
import type { NextPage } from 'next';
import { BoardList } from '../src/components/Board/BoardList';
import { Title } from '../src/components/Layout/Title';
import { MovieInfo } from '../src/components/Movie';
import useUser from '../src/libs/client/useUser';
import { IGetExistingBoards } from '../src/types/board';

const Home: NextPage = () => {
  const { loggedInUser } = useUser();
  const { data } = useSWR<IGetExistingBoards>(`/api/all/boards`);
  return (
    <>
      <Title title="홈" />
      <MovieInfo type="trending" />
      <BoardList
        allBoards={true}
        loggedInUser={loggedInUser}
        boards={data?.boards}
      />
    </>
  );
};
export default Home;
