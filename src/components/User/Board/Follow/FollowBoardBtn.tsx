import useSWR from 'swr';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { MutationRes } from '../../../../types/mutation';
import useMutation from '../../../../libs/client/useMutation';
import { IGetFollowingBoard } from '../../../../types/follow';
import { SVGPATH } from '../../../Style/Svg';
import useUser from '../../../../libs/client/useUser';
import { useEffect, useState } from 'react';

interface IFollowBoardProps {
  ID: {
    USERID: number;
    BOARDID: number;
  };
  property: {
    size?: number;
    right?: number;
    left?: number;
    top?: number;
    bottom?: number;
  };
}
export const FollowBoardBtn = ({ ID, property }: IFollowBoardProps) => {
  const { isLoggedIn, loggedInUser } = useUser();
  const [FollowBoard] = useMutation<MutationRes>(
    `/api/user/${ID.USERID}/board/${ID.BOARDID}/follow/create`
  );
  const { data, mutate } = useSWR<IGetFollowingBoard>(
    `/api/user/${ID.USERID}/board/${ID.BOARDID}`
  );
  const isHost = Boolean(isLoggedIn && loggedInUser?.id === ID.USERID);
  const onClick = () => {
    if (!isLoggedIn)
      return alert('해당보드를 팔로우 하려면 로그인이 필요합니다.');
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
      {!isHost && (
        <Cont prop={property}>
          <Button size={property.size!} onClick={onClick}>
            <svg
              xmlns={'http://www.w3.org/2000/svg'}
              viewBox={data?.isFollowing ? '0 0 512 512' : '0 0 448 512'}
            >
              <path d={SVGPATH('following', data?.isFollowing!)} />
            </svg>
          </Button>
        </Cont>
      )}
    </>
  );
};
const Button = styled.button<{ size: number }>`
  border: none;
  outline: none;
  background: none;
  svg {
    width: ${(p) => p.size && `${p.size}px`};
    height: ${(p) => p.size && `${p.size}px`};
    fill: ${(p) => p.theme.color.font};
  }
`;
const Cont = styled.article<{
  prop: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };
}>`
  position: absolute;
  top: ${(p) => p.prop.top && `${p.prop.top}px`};
  left: ${(p) => p.prop.left && `${p.prop.left}px`};
  right: ${(p) => p.prop.right && `${p.prop.right}px`};
  bottom: ${(p) => p.prop.bottom && `${p.prop.bottom}px`};
`;
