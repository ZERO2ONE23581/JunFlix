import styled from '@emotion/styled';
import { Post, Review, User } from '@prisma/client';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Icons } from '../../../../styles/svg';

interface IGetPostWithCounts {
  ok: boolean;
  error?: string;
  isLiked?: boolean;
  isComments?: boolean;
  post: CountsInPost;
}
interface CountsInPost extends Post {
  _count: {
    likes: number;
    comments: number;
  };
}
interface IGetReviewWithCounts {
  ok: boolean;
  error?: string;
  isLiked?: boolean;
  isComments?: boolean;
  review: CountsInReview;
}
interface CountsInReview extends Review {
  _count: {
    likes: number;
    comments: number;
  };
}
export const CommentIcon = ({ type, userId, reviewId }: any) => {
  const router = useRouter();
  const { user_id, board_id, post_id, review_id } = router.query;
  const queryPost = user_id && board_id && post_id;
  const isPost = Boolean(type === 'post') && queryPost;
  const isReivew = Boolean(type === 'review') && user_id && review_id;
  const isAllReivew = Boolean(type === 'review') && userId && reviewId;

  //Post
  const { data: postData } = useSWR<IGetPostWithCounts>(
    isPost && `/api/user/${user_id}/board/${board_id}/post/${post_id}`
  );
  const PostCounts = postData?.post?._count.comments;

  //Review
  const { data: reviewData } = useSWR<IGetReviewWithCounts>(
    isReivew
      ? `/api/user/${user_id}/review/${review_id}`
      : isAllReivew
      ? `/api/user/${userId}/review/${reviewId}`
      : null
  );
  const ReviewCounts = reviewData?.review?._count.comments;
  //
  return (
    <Cont>
      <Icon>
        {postData?.isComments || reviewData?.isComments ? (
          <Icons name="comments" type="solid" />
        ) : (
          <Icons name="comments" type="empty" />
        )}
      </Icon>
      <Counts>
        <span>
          {PostCounts ? PostCounts : ReviewCounts ? ReviewCounts : '0'}
        </span>
        <span>Comments</span>
      </Counts>
    </Cont>
  );
};
const Cont = styled.article`
  gap: 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
const Icon = styled.div`
  svg {
    width: 30px;
    height: 30px;
  }
`;
const Counts = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  span {
    text-align: center;
    font-size: 1.1rem;
    font-weight: 600;
  }
`;
