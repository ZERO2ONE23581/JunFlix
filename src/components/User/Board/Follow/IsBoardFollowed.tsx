import useSWR from 'swr';
import styled from '@emotion/styled';
import useUser from '../../../../libs/client/useUser';
import { MutationRes } from '../../../../types/mutation';
import useMutation from '../../../../libs/client/useMutation';
import {
  FollowedBoardIcon,
  UnFollowedBoardIcon,
} from '../../../Style/Svg/FollowBoard';
import { IsMyIcon } from '../../../Style/Svg/IsMy';

interface IIsFollowBoardProps {
  user_id?: number | null;
  board_id?: number | null;
}

export const IsBoardFollowed = ({ user_id, board_id }: IIsFollowBoardProps) => {
  const { data, mutate } = useSWR(`/api/user/${user_id}/board/${board_id}`);
  const { isLoggedIn, loggedInUser } = useUser();
  const isOwner = Boolean(loggedInUser?.id === user_id);
  const [followBoard] = useMutation<MutationRes>(
    `/api/user/${user_id}/board/${board_id}/follow/create`
  );
  const handleClick = () => {
    if (!isLoggedIn) return alert('로그인이 필요합니다.');
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
    followBoard({});
  };
  return (
    <Cont>
      {isOwner && (
        <div className="ismyboard">
          <IsMyIcon />
        </div>
      )}
      {isLoggedIn && (
        <Button onClick={handleClick}>
          {data?.isFollowing ? <FollowedBoardIcon /> : <UnFollowedBoardIcon />}
        </Button>
      )}
    </Cont>
  );
};
const Cont = styled.article`
  position: relative;
  .ismyboard {
    position: absolute;
    top: -240px;
    left: 10px;
    border: none;
    background-color: inherit;
  }
`;
const Button = styled.button`
  position: absolute;
  top: -40px;
  right: 5px;
  border: none;
  background-color: inherit;
`;
