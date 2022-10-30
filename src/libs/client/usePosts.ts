import useSWR from 'swr';
import { IGetPosts, IPostType } from '../../types/post';

export interface IUseGetAllPosts {
  counts: number | any;
  posts: IPostType[] | any;
}
export const useGetMyPosts = (host_id: number) => {
  const { data } = useSWR<IGetPosts>(`/api/post/all`);
  const posts = data?.posts?.filter((e) => e.host_id === host_id);
  const isData = data && data.ok && data.posts && posts;
  if (isData && posts.length > 0) return posts;
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
