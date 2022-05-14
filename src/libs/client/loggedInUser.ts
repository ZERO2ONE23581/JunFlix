import { User } from '@prisma/client';
import useSWR from 'swr';

interface ProfileResponse {
  ok: boolean;
  loggedInUser: User;
}

export default function useUser() {
  const { data, error } = useSWR<ProfileResponse>('/api/user/login');

  return { loggedInUser: data?.loggedInUser, isLoading: !data && !error };
}
