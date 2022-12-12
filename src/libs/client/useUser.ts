import useSWR from 'swr';
import { IRes } from '../../types/global';
import { IGetUser } from '../../types/user';
import useMutation from './useMutation';

export const useUser = () => {
  const { data } = useSWR<IGetUser>('/api/login');
  return {
    isLoggedIn: data?.ok!,
    user_id: data?.loggedInUser?.id!,
    loggedInUser: data?.loggedInUser!,
    avatar: data?.loggedInUser?.avatar!,
    userId: data?.loggedInUser?.userId!,
    username: data?.loggedInUser?.username!,
  };
};
export const useGetUser = (user_id: number) => {
  const { data } = useSWR<IGetUser>(Boolean(user_id) && `/api/user/${user_id}`);
  return {
    user: data?.user!,
    userId: data?.user?.userId!,
    avatar: data?.user?.avatar!,
    username: data?.user?.username!,
    num: {
      follower: data?.user?._count?.followers!,
      following: data?.user?._count?.followings!,
    },
  };
};
interface IUserPrivate extends IRes {
  onPrivate: boolean;
}
export const useUserPrivate = (user_id: number, isMyAcct: boolean) => {
  const [POST, { loading }] = useMutation(
    `/api/user/${user_id}/update/private`
  );
  const { data, mutate } = useSWR<IUserPrivate>(
    Boolean(user_id) && `/api/user/${user_id}/private`
  );
  const onPrivate = data?.onPrivate!;
  const onClick = () => {
    if (!isMyAcct) alert(`no right to edit`);
    if (loading) return;
    mutate({ onPrivate: !onPrivate }, false);
    return POST({});
  };
  const isBlur = !isMyAcct && onPrivate;
  return { onPrivate, onClick, data, isBlur };
};
