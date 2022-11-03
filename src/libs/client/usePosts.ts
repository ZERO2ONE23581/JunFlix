import useSWR from 'swr';
import { IGetPosts, IPostType } from '../../types/post';
import { useCapLetters } from './useTools';

export interface IUseGetAllPosts {
  counts?: number | any;
  posts: IPostType[] | any;
}
export const useGetAllPosts = () => {
  const { data } = useSWR<IGetPosts>(`/api/post/all`);
  const posts = data?.posts!;
  const isPost = data?.ok && Boolean(posts.length < 1);
  return { posts: data?.posts!, isPost };
};
export const useGetPosts = (host_id: number, board_id: number) => {
  const { data } = useSWR<IGetPosts>(`/api/post/all`);
  if (board_id) {
    const posts = data?.posts?.filter(
      (e) => e.host_id === host_id && e.board_id === board_id
    )!;
    const isPost = data?.ok && Boolean(posts.length > 0);
    return { posts, isPost };
  }
  const posts = data?.posts?.filter((e) => e.host_id === host_id)!;
  const isPost = data?.ok && Boolean(posts.length > 0);
  return { posts, isPost };
};
export const useGetQuickSaved = (host_id: number) => {
  const { data } = useSWR<IGetPosts>(`/api/post/all`);
  const posts = data?.posts?.filter(
    (e) => e.host_id === host_id && e.board_id === 0
  );
  return { posts, counts: posts?.length! };
};
export const usePostTitle = (title: string) => {
  const length = title.length;
  const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  const isKor = korean.test(title);
  if (isKor && length > 15) return useCapLetters(title.slice(0, 15)) + '...';
  else if (length <= 24) return useCapLetters(title);
  else return useCapLetters(title.slice(0, 24)) + '...';
};
