import useSWR from 'swr';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { MutationRes } from '../../../../types/mutation';
import useMutation from '../../../../libs/client/useMutation';
import {
  IFollowBoardProps,
  IGetFollowingBoard,
} from '../../../../types/follow';

export const FollowBtnInsideBoard = ({ isOwner }: IFollowBoardProps) => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const queryId = user_id && board_id;
  const { data, mutate } = useSWR<IGetFollowingBoard>(
    queryId && `/api/user/${user_id}/board/${board_id}`
  );
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
          _count: {
            ...data.board._count,
            followers: data.isFollowing
              ? data.board._count?.followers - 1
              : data.board._count?.followers + 1,
          },
        },
      },
      false
    );
    followBoard({});
  };
  const isFollower = data?.board?._count?.followers;
  return (
    <Cont>
      {isOwner ? (
        <Counts>
          <span>{isFollower === 1 ? 'Follower: ' : 'Followers: '}</span>
          <span>
            {data?.board?._count?.followers
              ? data?.board?._count?.followers
              : '0'}
          </span>
        </Counts>
      ) : (
        <Btn isFollowing={data?.isFollowing} onClick={handleClick}>
          {data?.isFollowing ? 'Following' : 'Follow'}
        </Btn>
      )}
    </Cont>
  );
};

const Cont = styled.article`
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
const Counts = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  span {
    text-align: center;
    font-size: 1.4rem;
    font-weight: 600;
  }
`;
