import useSWR from 'swr';
import styled from '@emotion/styled';
import { Btn } from '../../../../Style/Button';
import { MutationRes } from '../../../../../types/mutation';
import useMutation from '../../../../../libs/client/useMutation';
import { IGetFollowingBoard } from '../../../../../types/follow';

interface IFollowBoardProps {
  USERID: number;
  BOARDID: number;
}
export const FollowBoard = ({ USERID, BOARDID }: IFollowBoardProps) => {
  const [FollowBoard] = useMutation<MutationRes>(
    `/api/user/${USERID}/board/${BOARDID}/follow/create`
  );
  const { data, mutate } = useSWR<IGetFollowingBoard>(
    `/api/user/${USERID}/board/${BOARDID}`
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
        <Btn type="button" name="ON AIR" onClick={onClick} />
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
    font-size: 0.9rem;
    font-weight: 600;
    background-color: inherit;
    color: ${(p) => (p.isFollow ? p.theme.color.logo : 'inherit')};
    border: 3px solid
      ${(p) => (p.isFollow ? p.theme.color.logo : p.theme.color.font)};
  }
`;