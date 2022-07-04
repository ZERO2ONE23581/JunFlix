import useSWR from 'swr';
import { CommentInfo } from './CommentInfo';
import { IGetReplies } from '../../types/comments';

interface IRepliesProps {
  USERID: number;
  BOARDID: number;
  POSTID: number;
  REVIEWID: number;
  replyID: number;
}
export const CommentReplies = ({
  USERID,
  BOARDID,
  POSTID,
  REVIEWID,
  replyID,
}: IRepliesProps) => {
  const { data } = useSWR<IGetReplies>(
    BOARDID && POSTID && replyID
      ? `/api/user/${USERID}/board/${BOARDID}/post/${POSTID}/comment/${replyID}/replies`
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
