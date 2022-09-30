import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { BoardPage } from '.';
import useUser from '../../src/libs/client/useUser';
import { Title } from '../../src/components/Tools/Title';
import { HeadTitle } from '../../src/components/Layout/Head';
import { Fixed } from '../../src/components/Tools/Button/Fixed';
import { Slider } from '../../src/components/Tools/Slider';
import { useNeedLogin } from '../../src/libs/client/useTools';

const MyBoards: NextPage = () => {
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
