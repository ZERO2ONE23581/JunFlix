import useSWR from 'swr';
import { CommentInfo } from '..';
import styled from '@emotion/styled';
import { IGetReplies } from '../../../../../../../../../types/comments';
import { IQuery } from '../../../../../../../../../types/global';

interface IRepliesProps extends IQuery {
  comment_id: number;
}
export const ReplyList = ({ query, comment_id }: IRepliesProps) => {
  const { data } = useSWR<IGetReplies>(
    `/api/user/${query.userId}/board/${query.boardId}/post/${query.postId}/comment/${comment_id}/replies`
  );
  return (
    <Cont>
      {data?.replies?.map((reply) => (
        <CommentInfo
          isInReply
          query={query}
          key={reply.id}
          commentId={reply.id}
        />
      ))}
    </Cont>
  );
};
const Cont = styled.article`
  margin-left: 1rem;
`;
