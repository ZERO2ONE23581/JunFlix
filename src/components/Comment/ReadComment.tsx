import useSWR from 'swr';
import styled from '@emotion/styled';
import { CommentInfo } from './Read/Review/CommentInfo';
import { IGetAllComments } from '../../types/comments';

export interface IComment {
  USERID: number;
  BOARDID: number;
  POSTID: number;
  REVIEWID: number;
}
export const ReadComment = ({
  USERID,
  BOARDID,
  POSTID,
  REVIEWID,
}: IComment) => {
  const { data } = useSWR<IGetAllComments>(
    BOARDID && POSTID
      ? `/api/user/${USERID}/board/${BOARDID}/post/${POSTID}/comment`
      : REVIEWID
      ? `/api/user/${USERID}/review/${REVIEWID}/comment`
      : null
  );
  return (
    <Cont>
      {data?.allComments
        ?.filter((comment) => !comment.ReplyID)
        .map((comment) => (
          <CommentInfo
            key={comment.id}
            commentId={comment.id}
            USERID={USERID}
            POSTID={POSTID}
            BOARDID={BOARDID}
            REVIEWID={REVIEWID}
          />
        ))}
    </Cont>
  );
};
const Cont = styled.article`
  margin-top: 20px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
