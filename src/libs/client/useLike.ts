import useSWR from 'swr';
import { useState } from 'react';
import { useUser } from './useUser';
import useMutation from './useMutation';
import { IRes } from '../../types/global';
import { color } from '../../../styles/variants';

interface IUseLike {
  theme: boolean;
  post_id: number;
}
export const useLike = ({ post_id, theme }: IUseLike) => {
  const { isLoggedIn } = useUser();
  const [msg, setMsg] = useState('');
  const isAllowed = Boolean(isLoggedIn && post_id);
  const { data, mutate } = useSWR<IRes>(
    isAllowed && `/api/like/post/${post_id}`
  ); //GET
  const [post, { loading }] = useMutation('/api/like/post/create'); //POST
  const num = data?.num;
  const createLike = () => {
    const isLiked = data?.ok;
    if (loading) return;
    if (!isLoggedIn) return setMsg('need_login');
    post({ post_id });
    const zero_minus = num === 0 ? 0 : num - 1;
    return mutate(
      {
        ...data,
        ok: !isLiked,
        num: isLiked ? zero_minus : num + 1,
      },
      false
    );
  };
  const fill = data?.ok ? '#d63031' : color(theme);
  return { msg, fill, createLike, num };
};
