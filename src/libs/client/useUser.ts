import { User } from '@prisma/client';
import useSWR from 'swr';

interface ProfileResponse {
  ok: boolean;
  error?: string;
  loggedInUser?: User;
}

export default function useUser() {
  const { data } = useSWR<ProfileResponse>('/api/user/login');
  return {
    isloggedIn: data?.ok,
    loggedInUser: data?.loggedInUser,
  };
}
