import useSWR from 'swr';
import styled from '@emotion/styled';
import useMutation from '../../libs/client/useMutation';

import { Btn } from '../Tools/Button';
import { MutationRes } from '../../types/global';
import { IGetFollowingBoard } from '../../types/board';

interface IFollowBoard {
  userId: number;
  boardId: number;
}
export const Follow = ({ userId, boardId }: IFollowBoard) => {
  const [FollowBoard] = useMutation<MutationRes>(
    `/api/user/${userId}/board/${boardId}/follow/create`
  );
  const { data, mutate } = useSWR<IGetFollowingBoard>(
    `/api/user/${userId}/board/${boardId}`
  );
  const onClick = () => {
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
    <Cont className="follow-board" isFollow={data?.isFollowing!}>
      {data?.isFollowing && (
        <Btn type="button" name="ON AIR" onClick={onClick} svg="check" />
      )}
      {!data?.isFollowing && (
        <Btn type="button" name="Follow" onClick={onClick} />
      )}
    </Cont>
  );
};
const Cont = styled.article<{ isFollow: boolean }>`
  button {
    padding: 8px 10px;
    /* font-size: 0.9rem; */
    font-weight: 600;
    background-color: inherit;
    color: ${(p) => (p.isFollow ? p.theme.color.logo : p.theme.color.font)};
    border: 3px solid
      ${(p) => (p.isFollow ? p.theme.color.logo : p.theme.color.font)};
    svg {
      fill: ${(p) => p.theme.color.logo};
    }
  }
`;
