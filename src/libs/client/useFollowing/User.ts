import useSWR from 'swr';
import { useEffect } from 'react';
import useMutation from '../useMutation';
import { IRes } from '../../../types/global';
import { IGetFollowing } from '../../../types/following';

interface IResult<T> {
  name: string;
  follower: number;
  onClick: () => void;
  isFollowing?: boolean;
}
export default function useFollowUser<T = any>(user_id: number): IResult<T> {
  const [POST, { data: post_data, loading }] = useMutation<IRes>(
    `/api/following/create/user`
  );
  const API = Boolean(user_id) && `/api/following/user/${user_id}`;
  const { data, mutate } = useSWR<IGetFollowing>(API);

  const length = data?.length!;
  const isFollowing = data?.isFollowing!;
  const name = isFollowing ? 'Following' : 'Follow';

  const onClick = () => {
    if (loading) return;
    const isZero = Boolean(length === 0);
    const Length = isFollowing ? (isZero ? 0 : length - 1) : length + 1;
    if (!data) return;
    POST({ user_id });
    mutate({ length: Length, isFollowing: !data.isFollowing }, false);
  };
  useEffect(() => {
    if (post_data?.error) console.log(post_data.error);
  }, [post_data, useMutation]);

  return { follower: length, onClick, isFollowing: isFollowing!, name };
}
