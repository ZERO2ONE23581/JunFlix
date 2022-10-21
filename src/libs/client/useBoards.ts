import useSWR from 'swr';
import { IPostType } from '../../types/post';
import { IGetBoards } from '../../types/board';

export interface IUseGetAllPosts {
  counts: number | any;
  posts: IPostType[] | any;
}
export const useGetMyBoards = (host_id: number) => {
  const { data } = useSWR<IGetBoards>(`/api/board/all`);
  const isData = data && data.ok;
  const boards = isData && data.boards?.filter((e) => e.host_id === host_id);
  if (boards && boards?.length > 0) return boards;
};
