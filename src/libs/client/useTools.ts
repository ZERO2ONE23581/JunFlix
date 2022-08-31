import useUser from './useUser';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const useCapLetters = (word: string) => {
  return word?.replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase();
  });
};
export const useCapLetter = (word: string) => {
  return `${
    word?.toString()?.slice(0, 1).toUpperCase() + word?.toString().slice(1)
  }`;
};
export const useLength = (watch: string | undefined) => {
  if (watch) return watch.toString().replace(/\s/gi, '').length;
};
export const useNeedLogin = () => {
  const router = useRouter();
  const { isLoggedIn } = useUser();
  useEffect(() => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다. You need to sign in first.');
      router.push('/login');
    }
  }, [isLoggedIn, router]);
};
export const useNoAuthority = () => {
  const router = useRouter();
  const { user_id } = router.query;
  const { loggedInUser } = useUser();
  const isMyPage = Boolean(loggedInUser?.id === Number(user_id));
  useEffect(() => {
    if (!isMyPage) router.push('/');
  }, [router, isMyPage]);
};
export const useNeedLogout = () => {
  const router = useRouter();
  const { isLoggedIn } = useUser();
  useEffect(() => {
    if (isLoggedIn) router.push('/');
  }, [isLoggedIn, router]);
};
