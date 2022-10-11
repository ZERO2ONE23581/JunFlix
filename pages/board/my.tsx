import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { BoardPage } from './all';
import useUser from '../../src/libs/client/useUser';
import { Title } from '../../src/Tools/Title';
import { HeadTitle } from '../../src/components/head_title';
import { Fixed } from '../../src/Tools/Button/Fixed';
import { Slider } from '../../src/Tools/Slider';
import { useNeedLogin } from '../../src/libs/client/useTools';

const MyBoards: NextPage<{ theme: boolean }> = ({ theme }) => {
  const { loggedInUser } = useUser();
  return (
    <>
      <HeadTitle title={`${loggedInUser?.username}'s Boards`} />
      <Cont>
        <Title type="my-boards" />
        <Slider pageType="my-boards" sliderType="board" sliderDetail="my" />
      </Cont>
      <Fixed type="board" />
    </>
  );
};
export default MyBoards;

const Cont = styled(BoardPage)``;
