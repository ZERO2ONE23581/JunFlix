import useSWR from 'swr';
import { IGetUser } from '../../types/user';

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
  const { data: login } = useSWR<IGetUser>('/api/login');
  const { data } = useSWR<IGetUser>(Boolean(user_id) && `/api/user/${user_id}`);
  const isMyAcct = Boolean(login?.loggedInUser?.id === data?.user?.id);
  return {
    isMyAcct,
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
