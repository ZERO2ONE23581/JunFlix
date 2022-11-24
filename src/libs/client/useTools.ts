import { useUser } from './useUser';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { UseFormSetError } from 'react-hook-form';

export const useUploadImg = async (image: FileList | undefined) => {
  console.log(image, '??!!');
  if (image && image.length > 0) {
    const { uploadURL } = await (await fetch(`/api/file`)).json();
    const form = new FormData();
    form.append('file', image[0]);
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
interface IUseError {
  _data: {
    max: [number, number];
    types: [string, string];
    texts: [string, string];
    setError: UseFormSetError<any>;
  };
}
export const useTextLimit = ({ _data }: IUseError) => {
  const maxArr = _data?.max!;
  const typeArr = _data?.types!;
  const textArr = _data?.texts!;
  const setError = _data?.setError!;
  const max = (e: string) => maxArr[textArr.indexOf(e)]!;
  const type = (e: string) => typeArr[textArr.indexOf(e)]!;
  const message = (e: string) => `글자는 ${max(e)}를 초과할수 없습니다.`;
  const length = (e: string) => useLength(textArr[textArr.indexOf(e)]!);
  //
  const [first, sec] = textArr.map((element) => {
    if (length(element!) > max(element!)) {
      setError(type(element!), { message: message(element!) });
      return false;
    } else return true;
  });
  if (first && sec) return { ok: true };
  else return { ok: false };
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
