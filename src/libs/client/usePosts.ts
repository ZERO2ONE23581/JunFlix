import useSWR from 'swr';
import { IGetPosts, IPostType } from '../../types/post';

export interface IUseGetAllPosts {
  counts: number | any;
  posts: IPostType[] | any;
}
export const useGetAllPosts = (host_id: number) => {
  const { data } = useSWR<IGetPosts>(`/api/post/all`);
  const posts = data?.posts?.filter(
    (e) => e.board_id === 0 && e.host_id === host_id
  );
  const counts = posts?.length;
  return counts;
};
