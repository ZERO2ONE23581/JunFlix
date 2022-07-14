import useSWR from 'swr';
import styled from '@emotion/styled';
import { CommentInfo } from './\bCmtInfo';
import { IGetAllComments, IPostComment } from '../../../../types/comments';

export const CommentList = ({ post }: IPostComment) => {
  const { data } = useSWR<IGetAllComments>(
    post &&
      `/api/user/${post?.UserID}/board/${post?.BoardID}/post/${post?.id}/comment`
  );
  return (
    <Cont>
      {data?.allComments
        ?.filter((comment) => !comment.ReplyID)
        .map((comment) => (
          <CommentInfo post={post!} key={comment.id} commentId={comment.id} />
        ))}
    </Cont>
  );
};
const Cont = styled.article`
  margin-top: 10px;
  gap: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
