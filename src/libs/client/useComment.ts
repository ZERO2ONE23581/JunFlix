import { Comment, Like } from '@prisma/client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useSWR from 'swr';
import { IRes } from '../../types/global';
import { IUserType } from '../../types/user';

export interface TheComment extends Comment {
  host: IUserType;
  likes: Like[];
}
interface IGetComments {
  ok: boolean;
  og_host?: string;
  comments: TheComment[];
}
interface IUseComments {
  post_id: number;
}
interface IUseReplies {
  og_id: number;
  post_id: number;
}
interface IUseCmtRes {
  _data: {
    data: IRes | undefined;
    closeModal: () => void;
    setPost: Dispatch<SetStateAction<boolean>>;
    setCmtModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const useAllCmts = ({ post_id }: IUseComments) => {
  const { data } = useSWR<IGetComments>(
    `/api/comment/post/${post_id}/comments`
  );
  const all = data?.comments;
  const total_length = data?.comments?.length!;
  const originals = all?.filter((cmt) => cmt.og_id === 0 && cmt.reply_id === 0);
  const isOriginals = Boolean(originals?.length! > 0);
  return { originals, isOriginals, total_length };
};
export const useReplies = ({ post_id, og_id }: IUseReplies) => {
  const { data } = useSWR<IGetComments>(
    Boolean(og_id) && `/api/comment/post/${post_id}/comment/${og_id}/replies`
  );
  const replies = data?.comments!;
  const isReplies = Boolean(replies?.length! > 0);
  return { replies, isReplies };
};
interface IUseGetRepHost {
  cmt_id: number;
  post_id: number;
  reply_id: number;
  setPost: Dispatch<SetStateAction<boolean>>;
  setCmtModal: Dispatch<SetStateAction<boolean>>;
}
export const useGetRepHost = ({
  cmt_id,
  post_id,
  reply_id,
  setPost,
  setCmtModal,
}: IUseGetRepHost) => {
  const { data } = useSWR<IGetComments>(
    `/api/comment/post/${post_id}/comments`
  );
  const all = data?.comments;
  const reps = all?.find((cmt) => cmt.id === reply_id);
  const isReply = Boolean(cmt_id && reply_id && post_id);
  const { data: data_ } = useSWR<IGetComments>(
    isReply && `/api/comment/${cmt_id}/delete`
  );
  useEffect(() => {
    if (data_) {
      if (data_.ok) {
        setPost(false);
        setCmtModal(false);
        setTimeout(() => {
          setPost(true);
          setCmtModal(true);
        }, 500);
      }
    }
  }, [data_, setPost, setCmtModal]);
  return { replied_to: reps?.host.userId };
};
export const useCmtRes = ({ _data }: IUseCmtRes) => {
  const { data, closeModal, setPost, setCmtModal } = _data;
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    if (data) {
      setLoading(false);
      if (data.ok) {
        setPost(false);
        closeModal();
        setCmtModal(false);
        setTimeout(() => {
          setPost(true);
          setCmtModal(true);
        }, 500);
      }
    }
  }, [data, closeModal, setPost, setCmtModal]);
  return { Loading, setLoading };
};
