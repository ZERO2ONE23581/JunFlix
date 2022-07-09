import useSWR from 'swr';
import styled from '@emotion/styled';
import { PostCommentInfo } from './Read/Post/CommentInfo';
import { IGetAllComments, IPostComment } from '../../types/comments';

export const PostCommentList = ({ post }: IPostComment) => {
  const { data } = useSWR<IGetAllComments>(
    post &&
      `/api/user/${post?.UserID}/board/${post?.BoardID}/post/${post?.id}/comment`
  );
  return (
    <Cont>
      {data?.allComments
        ?.filter((comment) => !comment.ReplyID)
        .map((comment) => (
          <PostCommentInfo
            post={post!}
            key={comment.id}
            commentId={comment.id}
          />
        ))}
    </Cont>
  );
};
const Cont = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
