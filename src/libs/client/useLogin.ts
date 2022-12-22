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
export const useValidHost = (type: string) => {
  const router = useRouter();
  const { user_id } = router.query;
  const { user_id: host_id, userId } = useUser();
  const isMatch = Boolean(host_id === Number(user_id));
  useEffect(() => {
    if (type) {
      if (type === 'user_setting') {
        if (!isMatch) router.push(`/user/${host_id}/${userId}/setting`);
      }
      if (!isMatch && host_id) {
        if (type === 'posts') router.push(`/user/${host_id}/posts`);
        if (type === 'posts_quick')
          router.push(`/user/${host_id}/posts/quick_saved`);
        if (type === 'boards') router.push(`/user/${host_id}/boards`);
      }
    }
  }, [isMatch, router, type, host_id]);
};
