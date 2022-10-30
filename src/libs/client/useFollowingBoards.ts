import useSWR from 'swr';

import useMutation from './useMutation';
import { useRouter } from 'next/router';
import { IGetFollowing } from '../../types/following';
import { IRes } from '../../types/global';
import { useEffect } from 'react';
import { useUser } from './useUser';

interface IContent<T> {
  name?: string;
  follow: () => void;
  post_data?: IRes;
  isFollowing?: boolean;
  data?: IGetFollowing;
}
type IResult<T> = IContent<T>;
type idType = string | string[] | undefined | number;

export default function useFollowingBoards<T = any>(
  board_id: idType
): IResult<T> {
  const router = useRouter();
  const { isLoggedIn } = useUser();
  const [post, { data: post_data }] = useMutation<IRes>(
    `/api/following/create/board`
  );
  const { data, mutate } = useSWR<IGetFollowing>(
    `/api/following/board/${board_id}`
  );
  const follow = () => {
    if (!data) return;
    if (!isLoggedIn) return router.push('/login');
    if (isLoggedIn) {
      post({ board_id });
      mutate({ isFollowing: !data.isFollowing }, false);
    }
  };
  useEffect(() => {
    if (post_data?.error) alert(post_data.error);
  }, [post_data, useMutation]);
  //
  const isFollowing = data?.isFollowing!;
  const name = isFollowing ? 'Following' : 'Follow';
  return { follow, isFollowing, name, data, post_data };
}
