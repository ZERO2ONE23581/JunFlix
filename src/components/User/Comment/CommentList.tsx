import useSWR from 'swr';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { CommentDetail } from './\bCommentDetail';
import { IGetAllComments } from '../../../types/comments';

interface ICommentListsProps {
  isPost?: boolean;
  isReview?: boolean;
}
export const CommentList = ({ isPost, isReview }: ICommentListsProps) => {
  const router = useRouter();
  const { user_id, board_id, post_id, review_id } = router.query;
  const PostQuery = isPost && user_id && board_id && post_id;
  const ReviewQuery = isReview && user_id && review_id;
  const { data: PostData } = useSWR<IGetAllComments>(
    PostQuery &&
      `/api/user/${user_id}/board/${board_id}/post/${post_id}/comment`
  );
  const { data: ReviewData } = useSWR<IGetAllComments>(
    ReviewQuery && `/api/user/${user_id}/review/${review_id}/comment`
  );
  const Array = (data: IGetAllComments) => {
    return data?.allComments?.filter((comment) => !comment.ReplyID);
  };
  return (
    <Cont>
      {PostData &&
        Array(PostData)?.map((comment) => (
          <CommentDetail key={comment.id} isPost commentId={comment.id} />
        ))}
      {ReviewData &&
        Array(ReviewData)?.map((comment) => (
          <CommentDetail key={comment.id} isReview commentId={comment.id} />
        ))}
    </Cont>
  );
};
const Cont = styled.article`
  padding: 20px;
`;
