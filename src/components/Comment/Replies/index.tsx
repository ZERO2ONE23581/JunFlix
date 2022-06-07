import useSWR from 'swr';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { CommentInfo } from '..';
import { IGetReplies, IRepliesProps } from '../../../types/comments';

export const Replies = ({ parentId }: IRepliesProps) => {
  const router = useRouter();
  const { user_id, board_id, post_id } = router.query;
  const query_id = user_id && board_id && post_id && parentId;
  const { data } = useSWR<IGetReplies>(
    query_id &&
      `/api/user/${user_id}/board/${board_id}/post/${post_id}/comment/${parentId}/replies`
  );
  const replies = data?.replies;
  //
  return (
    <Cont>
      {replies?.map((reply) => (
        <CommentInfo key={reply.id} commentId={reply.id} />
      ))}
    </Cont>
  );
};
const Cont = styled.article``;
