import useSWR from 'swr';
import { Dispatch, SetStateAction, useState } from 'react';
import styled from '@emotion/styled';
import { Btn } from '../Tools/Button';
import { IData } from '../../types/global';
import { FollowModal } from '../Tools/Modal/Follow';
import { IGetFollowingBoard } from '../../types/board';
import useMutation from '../../libs/client/useMutation';

interface IFollowBoard {
  userId: number;
  boardId: number;
}
export const FollowBtn = ({ userId, boardId }: IFollowBoard) => {
  const [FollowBoard] = useMutation<IData>(
    `/api/user/${userId}/board/${boardId}/follow/create`
  );
  const { data, mutate } = useSWR<IGetFollowingBoard>(
    `/api/user/${userId}/board/${boardId}`
  );
  const [follow, setFollow] = useState(false);
  const [unfollow, setUnFollow] = useState(false);

  const onClick = () => {
    setFollow(false);
    setUnFollow(false);
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
      <Cont className="follow-board" isFollow={data?.isFollowing!}>
        {data?.isFollowing && (
          <Btn
            type="button"
            name="ON AIR"
            CLASSNAME="follow-btn"
            onClick={() => {
              setUnFollow(true);
            }}
            svg={{ type: 'check', size: '1.2rem', location: { right: true } }}
          />
        )}
        {!data?.isFollowing && (
          <Btn
            type="button"
            name="Follow"
            CLASSNAME="follow-btn"
            onClick={() => {
              setFollow(true);
            }}
          />
        )}
      </Cont>
      {follow && (
        <FollowModal type="follow" closeModal={setFollow} onClick={onClick} />
      )}
      {unfollow && (
        <FollowModal type="unfollow" closeModal={setFollow} onClick={onClick} />
      )}
    </>
  );
};
const Cont = styled.article<{ isFollow: boolean }>`
  .follow-btn {
    padding: 8px 10px;
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
