import useSWR from 'swr';
import { useRouter } from 'next/router';
import { CommentDetail } from './\bCommentDetail';
import { IGetReplies } from '../../types/comments';

interface IRepliesProps {
  isPost?: boolean;
  isReview?: boolean;
  parentId: number | any;
}
export const CommentReplies = ({
  isPost,
  isReview,
  parentId,
}: IRepliesProps) => {
  const router = useRouter();
  const { user_id, board_id, post_id, review_id } = router.query;
  const PostQuery = isPost && user_id && board_id && post_id;
  const ReviewQuery = isReview && user_id && review_id;
  const { data: PostData } = useSWR<IGetReplies>(
    PostQuery &&
      `/api/user/${user_id}/board/${board_id}/post/${post_id}/comment/${parentId}/replies`
  );
  const { data: ReplyData } = useSWR<IGetReplies>(
    ReviewQuery &&
      `/api/user/${user_id}/review/${review_id}/comment/${parentId}/replies`
  );
  const PostReplies = PostData?.replies;
  const ReviewReplies = ReplyData?.replies;
  return (
    <>
      {isPost &&
        PostReplies?.map((reply) => (
          <div key={reply.id}>
            <CommentDetail isPost commentId={reply.id} />
          </div>
        ))}
      {isReview &&
        ReviewReplies?.map((reply) => (
          <div key={reply.id}>
            <CommentDetail isReview commentId={reply.id} />
          </div>
        ))}
    </>
  );
};
