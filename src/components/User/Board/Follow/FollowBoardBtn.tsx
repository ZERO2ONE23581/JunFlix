import useSWR from 'swr';
import styled from '@emotion/styled';
import useUser from '../../../../libs/client/useUser';
import { MutationRes } from '../../../../types/mutation';
import useMutation from '../../../../libs/client/useMutation';
import { IGetFollowingBoard } from '../../../../types/follow';
import { Svg } from '../../../Style/Svg/Svg';

interface IFollowBoardProps {
  USERID: number;
  BOARDID: number;
}
export const FollowBoardBtn = ({ USERID, BOARDID }: IFollowBoardProps) => {
  const { isLoggedIn, loggedInUser } = useUser();
  const [FollowBoard] = useMutation<MutationRes>(
    `/api/user/${USERID}/board/${BOARDID}/follow/create`
  );
  const { data, mutate } = useSWR<IGetFollowingBoard>(
    `/api/user/${USERID}/board/${BOARDID}`
  );
  const isHost = Boolean(isLoggedIn && loggedInUser?.id === USERID);
  const onClick = () => {
    if (!isLoggedIn)
      return alert('해당보드를 팔로우 하려면 로그인이 필요합니다.');
    if (!data) return;
    mutate(
      {
        ...data,
        isFollowing: !data.isFollowing,
        board: {
          ...data.board,
        },
      },
      false
    );
    FollowBoard({});
  };
  return (
    <>
      {!isHost && (
        <Cont className="follow-btn">
          <button onClick={onClick}>
            {data?.isFollowing ? (
              <Svg type="following" />
            ) : (
              <Svg type="un-following" />
            )}
          </button>
        </Cont>
      )}
    </>
  );
};
const Cont = styled.article`
  button {
    border: none;
    outline: none;
    background: none;
    :hover {
      svg {
        fill: ${(p) => p.theme.color.logo};
      }
    }
  }
`;
