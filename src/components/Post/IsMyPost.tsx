import useSWR from 'swr';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import useUser from '../../libs/client/useUser';
import { MutationRes } from '../../types/mutation';
import useMutation from '../../libs/client/useMutation';

interface IIsFollowBoardProps {
  user_id: number;
  board_id: number;
}

export const IsMyPost = ({ user_id, board_id }: IIsFollowBoardProps) => {
  const { data, mutate } = useSWR(`/api/user/${user_id}/board/${board_id}`);
  const { loggedInUser } = useUser();
  const isOwner = Boolean(loggedInUser?.id === user_id);
  const [followBoard] = useMutation<MutationRes>(
    `/api/user/${user_id}/board/${board_id}/follow/create`
  );
  const handleClick = () => {
    if (isOwner) return;
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
      {isOwner ? (
        <IsOwnerTrue />
      ) : (
        <Btn isFollowing={data?.isFollowing} onClick={handleClick}>
          {data?.isFollowing ? 'Following' : 'Follow'}
        </Btn>
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
const Btn = styled.button<{ isFollowing: boolean | undefined }>`
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 5px;
  padding: 7px 20px;
  border: none;
  color: ${(p) => (p.isFollowing ? 'whitesmoke' : p.theme.color.bg)};
  background-color: ${(p) =>
    p.isFollowing ? p.theme.color.logo : p.theme.color.font};
  &:hover {
    color: ${(p) => p.theme.color.bg};
    background-color: ${(p) => p.theme.color.logo};
  }
`;
