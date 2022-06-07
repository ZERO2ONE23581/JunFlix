import useSWR from 'swr';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { CommentInfo } from '..';
import { IGetAllComments } from '../../../types/comments';

export const AllComments = () => {
  const router = useRouter();
  const { user_id, board_id, post_id } = router.query;
  const query_id = user_id && board_id && post_id;
  const { data } = useSWR<IGetAllComments>(
    query_id && `/api/user/${user_id}/board/${board_id}/post/${post_id}/comment`
  );
  const array = data?.allComments?.filter((comment) => !comment.ReplyID);
  return (
    <Cont>
      {array?.map((comment) => (
        <CommentInfo key={comment.id} commentId={comment.id} />
      ))}
    </Cont>
  );
};
const Cont = styled.article`
  padding: 20px;
`;
