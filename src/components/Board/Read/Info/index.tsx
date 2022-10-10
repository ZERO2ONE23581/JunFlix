import { Counts } from './Counts';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Svg } from '../../../../Tools/Svg';
import { FollowBtn } from '../../../../Tools/Button/Follow/BoardFollowBtn';
import useUser from '../../../../libs/client/useUser';
import { useCapLetters } from '../../../../libs/client/useTools';
import { ITheme } from '../../../../../styles/theme';

interface IInfo extends ITheme {
  info: {
    title: string;
    genre: string;
    intro: string;
  };
}
export const Info = ({ info }: IInfo) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const { user_id, board_id } = router.query;
  const isMyBoard = Boolean(loggedInUser?.id === Number(user_id));
  return (
    <>
      {info && (
        <Cont className="board-info-box">
          <h1>{useCapLetters(info.title)}</h1>
          <FollowBtn userId={Number(user_id)} boardId={Number(board_id)} />
          {info.intro && <p>"{info.intro}"</p>}
        </Cont>
      )}
      {!info && <p>Loading....</p>}
    </>
  );
};
const Cont = styled.article``;
