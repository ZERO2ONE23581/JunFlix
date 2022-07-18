import useSWR from 'swr';
import { CommentInfo } from '..';
import styled from '@emotion/styled';
import { IGetReplies } from '../../../../../../../../../../types/comments';
import { IPostCmtQuery } from '../../../../../../../../../../types/post';

interface IRepliesProps extends IPostCmtQuery {
  comment_id: number;
}
export const ReplyList = ({
  userId,
  boardId,
  postId,
  comment_id,
}: IRepliesProps) => {
  const { data } = useSWR<IGetReplies>(
    `/api/user/${userId}/board/${boardId}/post/${postId}/comment/${comment_id}/replies`
  );
  return (
    <Cont>
      {data?.replies?.map((reply) => (
        <CommentInfo
          isInReply
          key={reply.id}
          postId={postId}
          userId={userId}
          boardId={boardId}
          commentId={reply.id}
        />
      ))}
    </Cont>
  );
};
const Cont = styled.article`
  margin-left: 1.5rem;
`;
