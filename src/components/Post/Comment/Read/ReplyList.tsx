import useSWR from 'swr';
import styled from '@emotion/styled';
import { ReadPostCmtInfo } from './\bCmtInfo';
import { IGetReplies, IPostComment } from '../../../../types/comments';

interface IRepliesProps extends IPostComment {
  comment_id: number;
}
export const PostReplyList = ({ post, comment_id }: IRepliesProps) => {
  const { data } = useSWR<IGetReplies>(
    post &&
      `/api/user/${post?.UserID}/board/${post?.BoardID}/post/${post?.id}/comment/${comment_id}/replies`
  );
  return (
    <Cont>
      {data?.replies?.map((reply) => (
        <ReadPostCmtInfo key={reply.id} post={post!} commentId={reply.id} />
      ))}
    </Cont>
  );
};
const Cont = styled.article`
  margin-left: 30px;
`;
