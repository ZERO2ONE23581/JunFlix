import useSWR from 'swr';
import { CommentInfo } from './CommentInfo';
import { IGetReplies } from '../../types/comments';

interface IRepliesProps {
  USERID: number;
  BOARDID: number;
  POSTID: number;
  REVIEWID: number;
  parentId: number | any;
}
export const CommentReplies = ({
  USERID,
  BOARDID,
  POSTID,
  REVIEWID,
  parentId,
}: IRepliesProps) => {
  const { data } = useSWR<IGetReplies>(
    BOARDID && POSTID && parentId
      ? `/api/user/${USERID}/board/${BOARDID}/post/${POSTID}/comment/${parentId}/replies`
      : REVIEWID && parentId
      ? `/api/user/${USERID}/review/${REVIEWID}/comment/${parentId}/replies`
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
