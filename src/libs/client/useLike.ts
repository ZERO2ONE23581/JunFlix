import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { useUser } from './useUser';
import useMutation from './useMutation';
import { IRes } from '../../types/global';
import { color } from '../../../styles/variants';

interface IUseLike {
  theme: boolean;
  post_id: number;
}
interface IUseCmtLike {
  theme: boolean;
  isLiked: boolean;
  comment_id: number;
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
export const useCmtLike = ({ comment_id, theme, isLiked }: IUseCmtLike) => {
  const { isLoggedIn } = useUser();
  const [msg, setMsg] = useState('');
  //GET
  const { data, mutate } = useSWR<IRes>(
    Boolean(comment_id) && ` /api/like/comment/${comment_id}`
  );
  const [post, { loading }] = useMutation('/api/like/comment/create');
  //console.log(data, '###');
  const num = data?.num;
  const createLike = () => {
    const isLiked = data?.ok;
    if (loading) return;
    if (!isLoggedIn) return setMsg('need_login');
    post({ comment_id });
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
  const fill = isLiked || data?.ok ? '#d63031' : color(theme);
  return { msg, fill, createLike, num };
};
