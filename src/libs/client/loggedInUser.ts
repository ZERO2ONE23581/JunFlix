import { User } from '@prisma/client';
import useSWR from 'swr';

interface ProfileResponse {
  ok?: boolean;
  loggedInUser?: User;
  error?: string;
}

export default function useUser() {
  const { data, error } = useSWR<ProfileResponse>('/api/user/login');

  return {
    isloggedIn: data?.ok,
    loggedInUser: data?.loggedInUser,
    isLoading: !data && !error,
  };
}
