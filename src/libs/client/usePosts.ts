import useSWR from 'swr';
import { IGetPosts, IPostType } from '../../types/post';

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
export const useGetMyPosts = (host_id: number) => {
  const { data } = useSWR<IGetPosts>(`/api/post/all`);
  const posts = data?.posts?.filter((e) => e.host_id === host_id)!;
  const isPost = data?.ok && Boolean(posts.length > 0);
  return { posts, isPost };
};
export const useGetQsaved = (host_id: number) => {
  const { data } = useSWR<IGetPosts>(`/api/post/all`);
  const isData = data && data.ok && data.posts;
  if (isData) {
    const posts = data.posts?.filter((e) => e.host_id === host_id);
    if (posts) {
      const quickSaved = posts?.filter((e) => e.board_id === 0);
      if (quickSaved) return quickSaved.length;
    }
  }
};
