import type { NextPage } from 'next';
import styled from '@emotion/styled';
import useUser from '../../../../src/libs/client/useUser';
import { Title } from '../../../../src/components/Tools/Title';
import { HeadTitle } from '../../../../src/components/Layout/Head';
import { Fixed } from '../../../../src/components/Tools/Button/Fixed';
import { Slider } from '../../../../src/components/Tools/Slider';
import { BoardPage } from '../../../boards';

const MyBoards: NextPage = () => {
  // useNeedLogin();
  const { loggedInUser } = useUser();

  return (
    <>
      <HeadTitle title={`${loggedInUser?.username}'s Boards`} />
      <Cont>
        <Title
          kind="Boards"
          name={loggedInUser?.username!}
          svg={{ type: 'board', size: '2rem' }}
        />
        <Slider type="myBoards" />
      </Cont>
      <Fixed type="board" />
    </>
  );
};
export default MyBoards;

const Cont = styled(BoardPage)``;
