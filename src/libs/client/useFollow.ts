import useSWR from 'swr';
import useUser from './useUser';
import { useEffect, useState } from 'react';
import useMutation from './useMutation';
import { useRouter } from 'next/router';
import { IRes } from '../../types/global';
import { IGetFollowing } from '../../types/following';

export interface IFollowingUsers<T> {
  name?: string;
  post_result?: IRes;
  onClick: () => void;
  isFollowing?: boolean;
  data?: IGetFollowing;
}
type IResult<T> = IFollowingUsers<T>;
type idType = number | undefined;

export default function useFollow<T = any>(
  id: idType,
  type: string
): IResult<T> {
  const [Type, setType] = useState('');
  const [key, setKey] = useState(0);
  useEffect(() => {
    if (id) setKey(id);
    if (type) setType(type);
  }, [setType, setKey, type, id]);

  //post
  const router = useRouter();
  const { isLoggedIn } = useUser();
  const onClick = () => {
    if (!data) return;
    if (!isLoggedIn) return router.push('/login');
    if (isLoggedIn) {
      if (type === 'user') post({ user_id: id });
      else if (type === 'board') post({ board_id: id });
      return mutate({ isFollowing: !data.isFollowing }, false);
    }
  };
  const [post, { data: post_result }] = useMutation<IRes>(
    `/api/following/create/${Type}`
  );
  useEffect(() => {
    const success = post_result?.ok;
    const error = post_result?.error;
    if (error) alert(error);
    if (success) console.log(success);
  }, [post_result]);

  //get
  const { data, mutate } = useSWR<IGetFollowing>(
    Boolean(Type && key) && `/api/following/${Type}/${key}`
  );
  const isFollowing = data?.isFollowing;
  const name = isFollowing ? 'Following' : 'Follow';
  //
  return { onClick, isFollowing, name, data, post_result };
}
