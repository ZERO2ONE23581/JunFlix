import { Comment, Like } from '@prisma/client';
import useSWR from 'swr';
import { IUserType } from '../../types/user';

export interface TheComment extends Comment {
  host: IUserType;
  likes: Like[];
}
interface IGetComments {
  ok: boolean;
  comments: TheComment[];
}
interface IUseComments {
  post_id: number;
  cmt_id?: number;
}
export const useComments = ({ post_id, cmt_id }: IUseComments) => {
  const { data } = useSWR<IGetComments>(
    `/api/comment/post/${post_id}/comments`
  );

  const NoCmts = !data?.ok;
  const comments = data?.comments;
  const originals = comments?.filter(
    (cmt) => cmt.og_id === 0 && cmt.reply_id === 0
  );
  const replies = comments?.filter(
    (cmt) =>
      cmt.og_id &&
      cmt.reply_id &&
      cmt.og_id === cmt_id &&
      cmt.og_id === cmt.reply_id
  );

  const re_replies = comments?.filter(
    (cmt) => cmt.og_id && cmt.reply_id && cmt.reply_id === cmt_id
  );
  return { originals, NoCmts, replies, re_replies };
};
