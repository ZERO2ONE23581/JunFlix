import useSWR from 'swr';
import { Svg } from '../../../../../../../Tools/Svg';
import { IRes } from '../../../../../../../types/global';
import useMutation from '../../../../../../../libs/client/useMutation';
import { useUser } from '../../../../../../../libs/client/useUser';
import { useRouter } from 'next/router';
import { MsgModal } from '../../../../../../../Tools/Modal/Message';
import { useState } from 'react';
import { color } from '../../../../../../../../styles/variants';

interface ILike {
  theme: boolean;
  post_id: number;
  layoutId: string;
}
export const Like = ({ theme, post_id, layoutId }: ILike) => {
  const { isLoggedIn } = useUser();
  const [msg, setMsg] = useState('');
  const { data, mutate } = useSWR<IRes>(`/api/like/post/${post_id}`);
  const [create_like, { loading }] = useMutation('/api/like/post/create');

  const onClick = () => {
    if (loading) return;
    if (!isLoggedIn) return setMsg('need_login');
    create_like({ post_id });
    return mutate({ ...data, ok: !data?.ok }, false);
  };
  const fill = data?.ok ? '#d63031' : color(theme);
  return (
    <>
      <MsgModal _data={{ msg, theme, layoutId }} />
      <Svg item={{ fill }} type="like" theme={theme} onClick={onClick} />
    </>
  );
};
