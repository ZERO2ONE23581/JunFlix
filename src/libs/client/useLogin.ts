import { useEffect } from 'react';
import { useUser } from './useUser';
import { useRouter } from 'next/router';

export const useLogin = () => {
  const router = useRouter();
  const { isLoggedIn: data } = useUser();
  useEffect(() => {
    if (data !== undefined && data === false) router.push(`/login`);
  }, [data, router]);
};
