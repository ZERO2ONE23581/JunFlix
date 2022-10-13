import { BoardPage } from './all';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Slider } from '../../src/Tools/Slider';
import useUser from '../../src/libs/client/useUser';
import { HeadTitle } from '../../src/Tools/head_title';
import { PageTitle } from '../../src/Tools/Title/Page_Title';
import { FixedBtns } from '../../src/Tools/Button/Fixed';

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
