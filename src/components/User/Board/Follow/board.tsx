import useSWR from 'swr';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { MutationRes } from '../../../../types/mutation';
import useMutation from '../../../../libs/client/useMutation';
import {
  IFollowBoardProps,
  IGetFollowingBoard,
} from '../../../../types/follow';
import {
  FollowedBoardIcon,
  UnFollowedBoardIcon,
} from '../../../Style/Svg/FollowBoard';

export const FollowBoard = ({ isMyBoard }: IFollowBoardProps) => {
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
    if (isMyBoard) return;
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
      {isMyBoard ? (
        <Counts>
          <span>{isFollower === 1 ? 'Follower: ' : 'Followers: '}</span>
          <span>
            {data?.board?._count?.followers
              ? data?.board?._count?.followers
              : '0'}
          </span>
        </Counts>
      ) : (
        <Button isFollowing={data?.isFollowing} onClick={handleClick}>
          {data?.isFollowing ? <FollowedBoardIcon /> : <UnFollowedBoardIcon />}
        </Button>
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
const Button = styled.button<{ isFollowing: boolean | undefined }>`
  border: none;
  background-color: inherit;
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
