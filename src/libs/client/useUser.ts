import { User } from '@prisma/client';
import useSWR from 'swr';

interface ProfileResponse {
  ok?: boolean;
  loggedInUser?: User;
  loggedInUserId?: number;
  error?: string;
}

export default function useUser() {
  const { data, error } = useSWR<ProfileResponse>('/api/user/login');
  return {
    isloggedIn: data?.ok,
    isLoading: !data && !error,
    loggedInUser: data?.loggedInUser,
    loggedInUserId: data?.loggedInUser?.id,
  };
}
