import useSWR from 'swr';
import styled from '@emotion/styled';
import { CommentInfo } from '../Info';
import { IGetAllComments } from '../../../../../../../../types/comments';
import { IQuery } from '../../../../../../../../types/global';

export const CommentList = ({ query }: IQuery) => {
  const { data } = useSWR<IGetAllComments>(
    `/api/user/${query.userId}/board/${query.boardId}/post/${query.postId}/comment`
  );
  return (
    <List>
      {data?.allComments
        ?.filter((comment) => !comment.ReplyID)
        .map((comment) => (
          <CommentInfo key={comment.id} query={query} commentId={comment.id} />
        ))}
    </List>
  );
};
const List = styled.article`
  display: flex;
  padding: 10px 20px;
  flex-direction: column;
  justify-content: flex-start;
`;
