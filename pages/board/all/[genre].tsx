import {
  UseCapLetters,
  useResponsive,
} from '../../../src/libs/client/useTools';
import { IPage } from '../../_app';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { PostPage } from '../../../styles/post';
import { NoData } from '../../../src/Tools/NoData';
import { Head_ } from '../../../src/Tools/Title/Head';
import { PageTitle } from '../../../src/Tools/Title/Page';
import { useGenreBoards } from '../../../src/libs/client/useBoards';
import { BoardsGrid } from '../../../src/components/BoardsGrid';

const GenreBoards: NextPage<IPage> = ({ theme }) => {
  const router = useRouter();
  const { genre } = router.query;
  const Genre = genre?.toString()!;
  const { isDesk } = useResponsive();
  const { boards, isBoard } = useGenreBoards(Genre);
  const head_title = `${UseCapLetters(Genre)} Boards`;
  const onClick = () => router.push(`/board/create`);
  return (
    <>
      <Head_ title={head_title} />
      <PostPage isDesk={isDesk}>
        <PageTitle theme={theme} _genre={Genre} />
        {isBoard && (
          <BoardsGrid _data={{ theme, isBoard, boards }} _genre={Genre} />
        )}
        {!isBoard && (
          <NoData _data={{ theme, isMy: true, type: 'board', onClick }} />
        )}
      </PostPage>
    </>
  );
};
export default GenreBoards;
