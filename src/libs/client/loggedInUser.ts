import { User } from '@prisma/client';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

interface ProfileResponse {
  ok?: boolean;
  loggedInUser?: User;
  loggedInUserId?: number;
  error?: string;
}

export default function useUser() {
  const [avatarUrl, setAvatarUrl] = useState('');
  const imageUrl = (data: string | any) => {
    const VARIANTS = `public`;
    const BASE_URL = `https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg`;
    const url = `${BASE_URL}/${data}/${VARIANTS}`;
    return setAvatarUrl(url);
  };
  const { data, error } = useSWR<ProfileResponse>('/api/user/login');
  useEffect(() => {
    if (data?.ok) {
      imageUrl(data?.loggedInUser?.avatar);
    }
  }, [data, imageUrl]);
  return {
    isloggedIn: data?.ok,
    loggedInUser: data?.loggedInUser,
    loggedInUserId: data?.loggedInUser?.id,
    profile_avatar: avatarUrl || undefined,
    isLoading: !data && !error,
  };
}
