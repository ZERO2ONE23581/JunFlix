import { BoardPage } from '../all';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Slider } from '../../../src/Tools/Slider';
import { FixedBtns } from '../../../src/Tools/Button/Fixed';
import { HeadTitle } from '../../../src/Tools/head_title';
import { PageTitle } from '../../../src/Tools/Title/Page_Title';

const GenreBoards: NextPage<{ theme: boolean }> = ({ theme }) => {
  const router = useRouter();
  const genre = String(router.query.genre);
  return (
    <>
      <HeadTitle title={`${genre?.toUpperCase()} Boards`} />
      <Cont>
        <PageTitle
          type="board"
          theme={theme}
          detail={{ genre: { isGenre: true, type: genre } }}
        />
        <Slider
          theme={theme}
          sliderType="board"
          sliderDetail={genre}
          pageType="genre-boards"
        />
      </Cont>
      <FixedBtns theme={theme} type="board" />
    </>
  );
};
export default GenreBoards;

const Cont = styled(BoardPage)``;
