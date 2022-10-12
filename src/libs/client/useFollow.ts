import useSWR from 'swr';
import useUser from './useUser';
import useMutation from './useMutation';
import { useRouter } from 'next/router';
import { IGetFollowing } from '../../types/following';
import { IRes } from '../../types/global';
import { useEffect } from 'react';

interface IContent<T> {
  post_data?: IRes;
  btnName?: string;
  isFollowing?: boolean;
  data?: IGetFollowing;
}
type IResult<T> = [() => void, IContent<T>];

export default function useFollow<T = any>(board_id: number): IResult<T> {
  const router = useRouter();
  const { isLoggedIn } = useUser();
  const [post, { data: post_data }] = useMutation<IRes>(
    `/api/following/create/board`
  );
  const { data, mutate } = useSWR<IGetFollowing>(
    `/api/following/board/${board_id}`
  );
  const clickFollow = () => {
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
  const btnName = isFollowing ? 'Following' : 'Follow';
  return [clickFollow, { isFollowing, btnName, data, post_data }];
}
