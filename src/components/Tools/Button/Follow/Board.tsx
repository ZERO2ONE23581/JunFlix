import { Btn } from '..';
import useSWR from 'swr';
import { useState } from 'react';
import styled from '@emotion/styled';
import { IData } from '../../../../types/global';
import { FollowBoardModal } from '../../Modal/Follow/Board';
import { IGetFollowingBoard } from '../../../../types/board';
import useMutation from '../../../../libs/client/useMutation';

interface IFollowBtn {
  userId: number;
  boardId: number;
}
export const FollowBtn = ({ userId, boardId }: IFollowBtn) => {
  const [FollowBoard] = useMutation<IData>(
    `/api/user/${userId}/follow/board/${boardId}`
  );
  const { data, mutate } = useSWR<IGetFollowingBoard>(
    `/api/user/${userId}/board/${boardId}`
  );
  const [follow, setFollow] = useState(false);
  const [unFollow, setUnFollow] = useState(false);

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
            onClick={() => setUnFollow(true)}
            svg={{
              type: 'check',
              size: '1.2rem',
              fill: '#e50815',
              location: { right: true },
            }}
          />
        )}
        {!data?.isFollowing && (
          <Btn
            type="button"
            name="Follow"
            CLASSNAME="follow-btn"
            onClick={() => setFollow(true)}
          />
        )}
      </Cont>
      {follow && (
        <FollowBoardModal closeModal={setFollow} onClick={onClick} isFollow />
      )}
      {unFollow && (
        <FollowBoardModal closeModal={setFollow} onClick={onClick} isUnFollow />
      )}
    </>
  );
};
const Cont = styled.article<{ isFollow: boolean }>`
  button {
    color: ${(p) => (p.isFollow ? p.theme.color.logo : p.theme.color.font)};
    background-color: ${(p) => p.theme.color.bg};
    border: 2px solid
      ${(p) => (p.isFollow ? p.theme.color.logo : p.theme.color.font)};
  }
`;
