import useSWR from 'swr';
import { CommentInfo } from './CommentInfo';
import { IGetReplies, IPostComment } from '../../../../types/comments';

interface IRepliesProps extends IPostComment {
  replyID: number;
}
export const CommentReplies = ({ replyID }: IRepliesProps) => {
  const { data } = useSWR<IGetReplies>(
    BOARDID && POSTID && replyID
      ? `/api/user/${USERID}/board/${BOARDID}/post/${POSTID}/comment/`
      : REVIEWID && replyID
      ? `/api/user/${USERID}/review/${REVIEWID}/comment/${replyID}/replies`
      : null
  );
  return (
    <>
      {data?.replies?.map((reply) => (
        <CommentInfo
          key={reply.id}
          POSTID={POSTID}
          USERID={USERID}
          BOARDID={BOARDID}
          REVIEWID={REVIEWID}
          commentId={reply.id}
        />
      ))}
    </>
  );
};
