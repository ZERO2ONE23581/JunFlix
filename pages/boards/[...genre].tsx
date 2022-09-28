import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { BoardPage } from '.';
import { Title } from '../../src/components/Tools/Title';
import { HeadTitle } from '../../src/components/Layout/Head';
import { Fixed } from '../../src/components/Tools/Button/Fixed';
import { Slider } from '../../src/components/Tools/Slider';
import { useRouter } from 'next/router';
import { useCapLetter } from '../../src/libs/client/useTools';

const GenreBoards: NextPage = () => {
  const router = useRouter();
  const query = router.query.genre;
  const BoardType = query?.toString();
  return (
    <>
      <HeadTitle title={`${BoardType?.toUpperCase()} Boards`} />
      <Cont>
        <Title type="genre-board" genreBoardType={BoardType!} />
        <Slider type="board" boardType={BoardType} />
      </Cont>
      <Fixed type="board" />
    </>
  );
};
export default GenreBoards;

const Cont = styled(BoardPage)``;
