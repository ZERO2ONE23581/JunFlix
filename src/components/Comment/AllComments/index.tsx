import useSWR from 'swr';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { IGetAllComments } from '../../../types/comments';
import { ReviewCommentInfo } from '../Info/Review';
import { PostCommentInfo } from '../Info/Post';

export const AllComments = ({ type }: any) => {
  const router = useRouter();
  const { user_id, board_id, post_id, review_id } = router.query;
  const queryPost = user_id && board_id && post_id;
  const queryReview = user_id && review_id;
  const isPost = Boolean(type === 'post') && queryPost;
  const isReview = Boolean(type === 'review') && queryReview;

  //Post
  const { data } = useSWR<IGetAllComments>(
    isPost && `/api/user/${user_id}/board/${board_id}/post/${post_id}/comment`
  );
  const ArrayOnPost = data?.allComments?.filter((comment) => !comment.ReplyID);

  //Review
  const { data: ReviewData } = useSWR<IGetAllComments>(
    isReview && `/api/user/${user_id}/review/${review_id}/comment`
  );
  const ArrayOnReview = ReviewData?.allComments?.filter(
    (comment) => !comment.ReplyID
  );
  //
  return (
    <Cont>
      {isPost &&
        ArrayOnPost?.map((comment) => (
          <PostCommentInfo key={comment.id} commentId={comment.id} />
        ))}
      {isReview &&
        ArrayOnReview?.map((comment) => (
          <ReviewCommentInfo key={comment.id} commentId={comment.id} />
        ))}
    </Cont>
  );
};
const Cont = styled.article`
  padding: 20px;
`;
