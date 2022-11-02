import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Page } from '../../../styles/global';
import { HeadTitle } from '../../../src/Tools/head_title';
import { PageTitle } from '../../../src/Tools/Title/Page_Title';
import { BoardsGrid } from '../../../src/components/Board/Read/Grid';
import { useGetAllBoards } from '../../../src/libs/client/useBoards';

const GenreBoards: NextPage<{ theme: boolean }> = ({ theme }) => {
  const router = useRouter();
  const { genre: gen_type } = router.query;
  const { boards, isBoard } = useGetAllBoards();
  const Boards = boards?.filter((e) => e.genre === gen_type);
  const hideFilter = Boolean(gen_type);
  return (
    <>
      <HeadTitle title="All Boards" />
      <BoardPage>
        <PageTitle
          type="board"
          theme={theme}
          detail={{ genre: { isGenre: true, type: String(gen_type) } }}
        />
        <BoardsGrid _data={{ theme, isBoard, boards: Boards, hideFilter }} />
      </BoardPage>
    </>
  );
};
export default GenreBoards;

export const BoardPage = styled(Page)`
  padding: 0 4rem;
  .no-data {
    border: 2px solid yellow;
    min-height: 60vh;
  }
  .board-icons {
    top: 3.5rem;
    right: 5rem;
  }
  .genre-modal {
    top: 6rem;
    right: 2rem;
  }
  .page-title {
    padding-left: 1rem;
    padding-bottom: 2rem;
  }
`;
