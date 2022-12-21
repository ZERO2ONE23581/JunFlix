import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Page } from '../../../styles/global';
import { NoData } from '../../../src/Tools/NoData';
import { Head_ } from '../../../src/Tools/Title/Head';
import { useCapLetters } from '../../../src/libs/client/useTools';
import { PageTitle } from '../../../src/Tools/Title/Page';
import { BoardsGrid } from '../../../src/components/Board/Read/Boards';
import { useGenreBoards } from '../../../src/libs/client/useBoards';

const GenreBoards: NextPage<{ theme: boolean }> = ({ theme }) => {
  const router = useRouter();
  const { genre } = router.query;
  const Genre = genre?.toString()!;
  const { boards, isBoard } = useGenreBoards(Genre);
  const head_title = `${useCapLetters(Genre)} Boards`;
  return (
    <>
      <Head_ title={head_title} />
      <Cont>
        <PageTitle theme={theme} _genre={Genre} />
        {isBoard && (
          <BoardsGrid _data={{ theme, isBoard, boards }} _genre={Genre} />
        )}
        {!isBoard && <NoData _data={{ theme, isMy: true, type: 'board' }} />}
      </Cont>
    </>
  );
};
export default GenreBoards;

const Cont = styled(Page)`
  padding: 0 8rem;
`;
