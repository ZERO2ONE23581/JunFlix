import useUser from './useUser';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UseFormSetError } from 'react-hook-form';
import { IPostForm } from '../../types/post';

export const useUploadImg = async (
  image: FileList | undefined,
  host_id: number
) => {
  if (image && image.length > 0 && host_id) {
    const { uploadURL } = await (await fetch(`/api/file`)).json();
    const form = new FormData();
    form.append('file', image[0], host_id.toString());
    const {
      result: { id },
    } = await (
      await fetch(uploadURL, {
        method: 'POST',
        body: form,
      })
    ).json();
    return id;
  }
};
interface IUserError {
  title: string;
  desc: string;
  max: {
    title: number;
    desc: number;
  };
  setError: UseFormSetError<IPostForm>;
}
export const useError = ({ title, desc, max, setError }: IUserError) => {
  const typed_title = useLength(title);
  const typed_desc = useLength(desc);
  if (isOverMax(typed_title, max.title))
    return setError('title', {
      message: `제목은 ${max.title}을 초과할 수 없습니다.`,
    });
  if (isOverMax(typed_desc, max.desc))
    return setError('description', {
      message: `포스트의 글자수는 ${max.desc}를 초과할 수 없습니다.`,
    });
};

interface IUseMax {
  sec: number;
  first: number;
}
export const useMaxLength = (title: number, desc: number) => {
  const [max] = useState({ title, desc });
  return { max };
};
export const isOverMax = (typed: number, max: number) => Boolean(typed > max);
export const useHeight = (watch: string, start: number) => {
  const [Height, setHeight] = useState(start);
  useEffect(() => {
    setHeight(watch?.length * 0.5);
  }, [setHeight, watch]);
  return { Height };
};

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
export const useLength = (text: string) =>
  String(text).replace(/\s/gi, '').length;

export const useNeedLogin = () => {
  const router = useRouter();
  const { isLoggedIn } = useUser();
  useEffect(() => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다. You need to sign in first.');
      router.push('/user/login');
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
