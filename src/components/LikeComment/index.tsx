import useSWR from 'swr';
import styled from '@emotion/styled';
import { LikesIcon } from './Likes';
import { CommentIcon } from './Comment/icon';
import { useRouter } from 'next/router';
import { CreateComments } from './Comment/create';
import { CommentList } from './Comment/created/CommentList';

export const LikeComment = () => {
  const router = useRouter();
  const { user_id, board_id, post_id } = router.query;
  const query_id = user_id && board_id && post_id;
  const { data } = useSWR(
    query_id && `/api/user/${user_id}/board/${board_id}/post/${post_id}`
  );
  const commentsCount = data?.post?._count.comments;
  //
  return (
    <Cont>
      <article className="icons-wrap">
        <LikesIcon userId={user_id} boardId={board_id} postId={post_id} />
        <CommentIcon
          isComments={data?.isComments}
          commentsCount={commentsCount}
        />
      </article>
      <CreateComments />
      <CommentList />
    </Cont>
  );
};
const Cont = styled.section`
  padding: 20px;
  border: 3px solid black;
  .icons-wrap {
    border: 2px solid blue;
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
  }
`;
