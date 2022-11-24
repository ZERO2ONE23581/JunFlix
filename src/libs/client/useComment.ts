import { Comment } from '@prisma/client';
import useSWR from 'swr';
import { IUserType } from '../../types/user';

export interface TheComment extends Comment {
  host: IUserType;
}
interface IGetComments {
  ok: boolean;
  comments: TheComment[];
}
interface IUseComments {
  post_id: number;
  host_id: number;
  cmt_id?: number;
}
export const useComments = ({ post_id, host_id, cmt_id }: IUseComments) => {
  const { data } = useSWR<IGetComments>(`/api/comment/${host_id}/${post_id}`);
  const comments = data?.comments;
  const NoCmts = !data?.ok;
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
