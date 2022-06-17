import useSWR from 'swr';
import styled from '@emotion/styled';
import useUser from '../../../../libs/client/useUser';
import { MutationRes } from '../../../../types/mutation';
import useMutation from '../../../../libs/client/useMutation';
import {
  FollowedBoardIcon,
  UnFollowedBoardIcon,
} from '../../../Style/Svg/FollowBoard';

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
      {isOwner && <IsOwnerTrue />}
      {isLoggedIn && (
        <Button onClick={handleClick}>
          {data?.isFollowing ? <FollowedBoardIcon /> : <UnFollowedBoardIcon />}
        </Button>
      )}
    </Cont>
  );
};
const Cont = styled.article``;

const Button = styled.button`
  position: absolute;
  right: 5px;
  bottom: 110px;
  border: none;
  background-color: inherit;
`;

const IsOwnerTrue = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  position: absolute;
  bottom: 370px;
  right: -10px;
  background-color: #2ecc71;
`;
