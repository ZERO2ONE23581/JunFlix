import useSWR from 'swr';
import styled from '@emotion/styled';
import { ReadPostCmtInfo } from './\bCmtInfo';
import { IGetAllComments, IPostComment } from '../../../../types/comments';

export const ReadPostCmtList = ({ post }: IPostComment) => {
  const { data } = useSWR<IGetAllComments>(
    post &&
      `/api/user/${post?.UserID}/board/${post?.BoardID}/post/${post?.id}/comment`
  );
  return (
    <Cont>
      {data?.allComments
        ?.filter((comment) => !comment.ReplyID)
        .map((comment) => (
          <ReadPostCmtInfo
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
