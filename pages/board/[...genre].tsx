import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { BoardPage } from '.';
import { Title } from '../../src/Tools/Title';
import { HeadTitle } from '../../src/components/Head';
import { Fixed } from '../../src/Tools/Button/Fixed';
import { Slider } from '../../src/Tools/Slider';
import { useRouter } from 'next/router';
import { useCapLetter } from '../../src/libs/client/useTools';

const GenreBoards: NextPage<{ theme: boolean }> = ({ theme }) => {
  const router = useRouter();
  const query = router.query.genre;
  const BoardType = query?.toString();
  return (
    <>
      <HeadTitle title={`${BoardType?.toUpperCase()} Boards`} />
      <Cont>
        <Title type="genre-board" genreBoardType={BoardType!} />
        <Slider
          sliderType="board"
          pageType="genre-boards"
          sliderDetail={BoardType}
        />
      </Cont>
      <Fixed type="board" />
    </>
  );
};
export default GenreBoards;

const Cont = styled(BoardPage)``;
