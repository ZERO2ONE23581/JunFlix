import { BoardPage } from '../all/boards';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Slider } from '../../src/Tools/Slider';
import { HeadTitle } from '../../src/Tools/head_title';
import { PageTitle } from '../../src/components/Board/Read/BoardTitle';
import { FixedBtns } from '../../src/Tools/Button/Fixed';
import { useUser } from '../../src/libs/client/useUser';

const MyBoards: NextPage<{ theme: boolean }> = ({ theme }) => {
  const { loggedInUser } = useUser();
  return (
    <>
      <HeadTitle title={`${loggedInUser?.username}'s Boards`} />
      <Cont>
        <PageTitle type="board" theme={theme} detail={{ my: true }} />
        <Slider
          theme={theme}
          sliderDetail="my"
          sliderType="board"
          pageType="my-boards"
        />
      </Cont>
      <FixedBtns theme={theme} type="board" />
    </>
  );
};
export default MyBoards;

const Cont = styled(BoardPage)``;
