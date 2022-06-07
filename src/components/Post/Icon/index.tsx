import useSWR from 'swr';
import styled from '@emotion/styled';
import { LikesIcon } from '../../Likes';
import { useRouter } from 'next/router';
import { CommentIcon } from '../../\bComments/Icon';
import { CreateComment } from '../../\bComments/Comment/Create';
import { Comments } from '../../\bComments';

export const LikesAndComments = () => {
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
      <h1>해당 포스트에 댓글 남기기</h1>
      <CreateComment />
      <Comments />
    </Cont>
  );
};
const Cont = styled.section`
  padding: 20px;
  border: 10px solid black;
  .icons-wrap {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
  }
  h1 {
    padding-left: 20px;
    font-size: 1.4rem;
    font-weight: 700;
    color: ${(p) => p.theme.color.font};
  }
`;
