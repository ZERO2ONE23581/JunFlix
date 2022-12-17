import useSWR from 'swr';
import useMutation from './useMutation';
import { IRes } from '../../types/global';
import { IGetUser, IGetUsers } from '../../types/user';

export const useGetUsers = () => {
  const { data } = useSWR<IGetUsers>('/api/user/all');
  const users = data?.users;
  const noData = data?.noData;
  return { users, noData };
};
export const useUser = () => {
  const { data } = useSWR<IGetUser>('/api/login');
  const isLoggedIn = data?.ok!;
  const user = data?.loggedInUser!;
  const user_id = user?.id!;
  const avatar = user?.avatar!;
  const userId = user?.userId!;
  const username = user?.username!;
  return { avatar, userId, user_id, username, isLoggedIn, loggedInUser: user! };
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
export interface IPrivate extends IRes {
  onPrivate: boolean;
}
export const useUserPrivate = (user_id: number, isMyAcct: boolean) => {
  const [POST, { loading }] = useMutation(
    `/api/user/${user_id}/update/private`
  );
  const { data, mutate } = useSWR<IPrivate>(
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
