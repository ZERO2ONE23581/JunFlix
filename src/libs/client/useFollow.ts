import useSWR from 'swr';
import { useUser } from './useUser';
import useMutation from './useMutation';
import { useRouter } from 'next/router';
import { IRes } from '../../types/global';
import { useEffect, useState } from 'react';
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
  const [key, setKey] = useState(0);
  const [Type, setType] = useState('');
  useEffect(() => {
    if (id) setKey(id);
    if (type) setType(type);
  }, [setType, setKey, type, id]);

  //post
  const router = useRouter();
  const { isLoggedIn } = useUser();
  const [post, { data: post_result }] = useMutation<IRes>(
    `/api/following/create/${Type}`
  );
  //get
  const { data, mutate } = useSWR<IGetFollowing>(
    Boolean(Type && key) && `/api/following/${Type}/${key}`
  );
  const onClick = () => {
    if (!data) return;
    if (!isLoggedIn) return router.push('/login');
    if (isLoggedIn) {
      if (type === 'user') post({ user_id: id });
      else if (type === 'board') post({ board_id: id });
      return mutate({ ...data, isFollowing: !isFollowing }, false);
    }
  };
  useEffect(() => {
    const success = post_result?.ok;
    const error = post_result?.error;
    if (error) alert(error);
    if (success) console.log(success);
  }, [post_result]);

  const isFollowing = data?.isFollowing;
  const [name, setName] = useState('');
  useEffect(() => {
    if (Type) {
      if (Type === 'user') {
        if (!isFollowing) setName('Follow');
        if (isFollowing) setName('Following');
      }
      if (Type === 'board') {
        if (!isFollowing) setName('Save');
        if (isFollowing) setName('Saved');
      }
    }
  }, [setName, Type, isFollowing]);
  //
  return { onClick, isFollowing, name, data, post_result };
}
