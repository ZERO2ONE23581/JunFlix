import useSWR from 'swr';
import { useEffect } from 'react';
import { useUser } from '../useUser';
import { useRouter } from 'next/router';
import useMutation from '../useMutation';
import { IRes } from '../../../types/global';
import { IGetFollowingBoard } from '../../../types/following';

interface IResult<T> {
  name: string;
  Saved: number;
  onClick: () => void;
  isFollowing: boolean;
}
export default function useFollowingBoard<T = any>(
  board_id: number
): IResult<T> {
  const router = useRouter();
  const { isLoggedIn } = useUser();
  const [POST, { data: post_data, loading }] = useMutation<IRes>(
    `/api/following/create/board`
  );
  const { data, mutate } = useSWR<IGetFollowingBoard>(
    `/api/following/board/${board_id}`
  );
  const Saved = data?.length!;
  const onClick = () => {
    if (loading) return;
    const isZero = Boolean(Saved === 0);
    const saved = isFollowing ? (isZero ? 0 : Saved - 1) : Saved + 1;
    if (!data) return;
    if (!isLoggedIn) return router.push('/login');
    if (isLoggedIn) {
      POST({ board_id });
      mutate({ length: saved, isFollowing: !data.isFollowing }, false);
    }
  };
  useEffect(() => {
    if (post_data?.error) console.log(post_data.error);
  }, [post_data, useMutation]);
  //
  const isFollowing = data?.isFollowing!;
  const name = isFollowing ? 'Following' : 'Follow';
  return { Saved, onClick, isFollowing, name };
}
