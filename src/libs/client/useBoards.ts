import useSWR from 'swr';
import { IGetBoard, IGetBoards } from '../../types/board';
import { useGetUser, useUser } from './useUser';

export const useGetAllBoards = () => {
  const { data } = useSWR<IGetBoards>(`/api/board/all`);
  return { boards: data?.boards!, isBoard: Boolean(data?.boards?.length! > 0) };
};
export const useGetBoards = (host_id: any) => {
  const { user } = useGetUser(host_id);
  const { data } = useSWR<IGetBoards>(`/api/board/all`);
  const length = data?.boards?.length!;
  const isBoard = Boolean(length > 0);
  const boards = data?.boards?.filter((e: IGetBoard) => e.host_id === host_id)!;
  const Saved = data?.boards?.filter((board) =>
    user?.followings?.map((e) => e.board_id).includes(board.id)
  )!;
  const isSaved = Boolean(Saved?.length! > 0);
  return { boards, isBoard, Saved, isSaved };
};
export const useGetFollowingBoards = ({ saves }: any) => {
  const { data } = useSWR<IGetBoards>(`/api/board/all`);
  const boards = data?.boards?.filter((board) => saves?.includes(board.id));
  return { SavedBoards: boards, isSaved: Boolean(boards?.length! > 0) };
};
export const useGetBoard = (board_id: any) => {
  const { data } = useSWR<IGetBoard>(board_id && `/api/board/${board_id}`);
  const board = data?.board;
  const { user_id } = useUser();
  const isMyBoard = Boolean(user_id === board?.host_id);
  return { board, isMyBoard };
};
