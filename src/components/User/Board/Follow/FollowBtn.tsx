import useSWR from 'swr';
import styled from '@emotion/styled';
import useUser from '../../../../libs/client/useUser';
import { MutationRes } from '../../../../types/mutation';
import useMutation from '../../../../libs/client/useMutation';
import { Btn } from '../../../Style/Button';

interface IIsFollowBoardProps {
  user_id: number;
  board_id: number;
}

export const FollowBtn = ({ user_id, board_id }: IIsFollowBoardProps) => {
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
        <Btn
          type="button"
          name={data?.isFollowing ? 'Following' : 'Follow'}
          clicked={data?.isFollowing}
          onClick={handleClick}
        />
      )}
    </Cont>
  );
};
const IsOwnerTrue = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  position: absolute;
  bottom: 370px;
  right: -10px;
  background-color: #2ecc71;
`;
const Cont = styled.article`
  position: relative;
  margin: 10px 0;
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
