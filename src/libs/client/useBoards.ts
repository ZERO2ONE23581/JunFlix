import useSWR from 'swr';
import { IGetBoard, IGetBoards } from '../../types/board';
import { useUser } from './useUser';

export const useGetAllBoards = () => {
  const { data } = useSWR<IGetBoards>(`/api/board/all`);
  return { boards: data?.boards!, isBoard: Boolean(data?.boards?.length! > 1) };
};
export const useGetBoards = (host_id: any) => {
  const { data } = useSWR<IGetBoards>(`/api/board/all`);
  const boards = data?.boards?.filter((e: IGetBoard) => e.host_id === host_id)!;
  return { boards, isBoard: Boolean(data?.boards?.length! > 1) };
};
export const useGetBoard = (board_id: any) => {
  const { data } = useSWR<IGetBoard>(board_id && `/api/board/${board_id}`);
  const board = data?.board;
  const { user_id } = useUser();
  const isMyBoard = Boolean(user_id === board?.host_id);
  return { board, isMyBoard };
};
