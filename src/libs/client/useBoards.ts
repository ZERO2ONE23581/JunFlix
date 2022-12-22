import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect } from 'react';
import useSWR from 'swr';
import { IBoardType, IGetBoard, IGetBoards } from '../../types/board';
import { IRes } from '../../types/global';
import useMutation from './useMutation';
import { IPrivate, useGetUser, useUser } from './useUser';

export const useGetAllBoards = () => {
  const { data } = useSWR<IGetBoards>(`/api/board/all`);
  return { boards: data?.boards!, isBoard: Boolean(data?.boards?.length! > 0) };
};
export const useGenreBoards = (genre: string) => {
  const { data } = useSWR<IGetBoards>(`/api/board/all`);
  const boards = data?.boards?.filter((e) => e.genre === genre)!;
  return { boards, isBoard: Boolean(boards?.length! > 0) };
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
export const useGetBoard = (board_id: any) => {
  const { data } = useSWR<IGetBoard>(board_id && `/api/board/${board_id}`);
  const board = data?.board!;
  const { user_id } = useUser();
  const isMyBoard = Boolean(user_id === board?.host_id);
  return { board, isMyBoard };
};
interface IUseBoardPrivate {
  host_id: number;
  board_id: number;
}
export const useBoardPrivate = ({ host_id, board_id }: IUseBoardPrivate) => {
  const [POST, { loading }] = useMutation(
    `/api/board/${board_id}/update/private`
  );
  const { data, mutate } = useSWR<IPrivate>(
    Boolean(board_id) && `/api/board/${board_id}/private`
  );
  const onPrivate = data?.onPrivate!;
  const handleBoard = () => {
    if (loading) return;
    mutate({ onPrivate: !onPrivate }, false);
    return POST({ user_id: host_id });
  };
  return { onPrivate, handleBoard, data };
};

interface IUseBoardResult {
  _data: {
    data?: IRes;
    type: string;
    closeModal: () => void;
    setMsg: Dispatch<SetStateAction<string>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
  };
}
export const useBoardResult = ({ _data }: IUseBoardResult) => {
  const router = useRouter();
  const { data, setLoading, setMsg, closeModal, type } = _data;
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
        if (data.error) {
          setMsg(data.error);
          setTimeout(() => {
            setMsg('');
          }, 2000);
        }
        if (data.ok) {
          closeModal();
          if (type === 'update-board') {
            setMsg('updated');
            setTimeout(() => {
              return router.reload();
            }, 1000);
          }
          if (type === 'delete-board') {
            setMsg('deleted');
            setTimeout(() => {
              return router.replace(`/board/all`);
            }, 1000);
          }
        }
      }, 1000);
    }
  }, [type, data, setLoading, setTimeout, router, setMsg, closeModal]);
};

interface IUseBoardApi {
  _data: {
    type: string;
    original: IBoardType;
    setApi: Dispatch<SetStateAction<string>>;
    setLayoutId: Dispatch<SetStateAction<string>>;
  };
}
export const useBoardApi = ({ _data }: IUseBoardApi) => {
  const { type, original, setLayoutId, setApi } = _data;
  useEffect(() => {
    if (type && original) {
      setLayoutId(type);
      if (type === 'update-board') setApi(`/api/board/${original.id}/update`);
      if (type === 'delete-board') setApi(`/api/board/${original.id}/delete`);
    }
  }, [setApi, type, original, setLayoutId]);
};
