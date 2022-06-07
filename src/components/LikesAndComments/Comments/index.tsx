import useSWR from 'swr';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Comment, User } from '@prisma/client';
import { EachComment } from './Comment/EachComment';

interface IGetAllComments {
  ok: boolean;
  error?: string;
  allComments: CommentWithUser[];
}
interface CommentWithUser extends Comment {
  user: User;
}

export const Comments = () => {
  const router = useRouter();
  const { user_id, board_id, post_id } = router.query;
  const query_id = user_id && board_id && post_id;
  const { data } = useSWR<IGetAllComments>(
    query_id && `/api/user/${user_id}/board/${board_id}/post/${post_id}/comment`
  );
  const array = data?.allComments?.filter((comment) => !comment.ReplyID);
  //
  return (
    <Cont>
      {array?.map((comment) => (
        <EachComment key={comment.id} commentId={comment.id} />
      ))}
    </Cont>
  );
};
const Cont = styled.article`
  padding: 20px;
`;
