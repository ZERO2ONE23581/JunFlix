import useSWR from 'swr';
import styled from '@emotion/styled';
import { CommentInfo } from '../Info';
import { IPostCmtQuery } from '../../../../../../../../../types/post';
import { IGetAllComments } from '../../../../../../../../../types/comments';

export const CommentList = ({ userId, postId, boardId }: IPostCmtQuery) => {
  const { data } = useSWR<IGetAllComments>(
    `/api/user/${userId}/board/${boardId}/post/${postId}/comment`
  );
  return (
    <List>
      {data?.allComments
        ?.filter((comment) => !comment.ReplyID)
        .map((comment) => (
          <CommentInfo
            key={comment.id}
            postId={postId}
            userId={userId}
            boardId={boardId}
            commentId={comment.id}
          />
        ))}
    </List>
  );
};
const List = styled.article`
  gap: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
