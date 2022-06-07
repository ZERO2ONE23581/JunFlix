import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Comment } from '@prisma/client';
import styled from '@emotion/styled';
import { CommentInfo } from '..';

interface IGetReplies {
  replies: Comment[];
}
export const Replies = ({ parentId }: any) => {
  const router = useRouter();
  const { user_id, board_id, post_id } = router.query;
  const query_id = user_id && board_id && post_id;
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
const Cont = styled.article`
  padding-left: 10%;
`;
