import useSWR from 'swr';
import styled from '@emotion/styled';
import { Post, Review, User } from '@prisma/client';
import { Icons } from '../../../../styles/svg';
import useMutation from '../../../libs/client/useMutation';
import { useRouter } from 'next/router';

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
export const LikesIcon = ({ type, userId, reviewId }: any) => {
  const router = useRouter();
  const { user_id, board_id, post_id, review_id } = router.query;
  const isPost = Boolean(type === 'post') && user_id && board_id && post_id;
  const isReivew = Boolean(type === 'review') && user_id && review_id;
  const isAllReivew = Boolean(type === 'review') && userId && reviewId;

  //Post
  const { data, mutate } = useSWR<IGetPostWithCounts>(
    isPost && `/api/user/${user_id}/board/${board_id}/post/${post_id}`
  );
  const PostCounts = data?.post?._count.likes;
  const [createOnPost] = useMutation(
    `/api/user/${user_id}/board/${board_id}/post/${post_id}/create/likes`
  );

  //Review
  const { data: reviewData, mutate: reivewMutate } =
    useSWR<IGetReviewWithCounts>(
      isReivew
        ? `/api/user/${user_id}/review/${review_id}`
        : isAllReivew
        ? `/api/user/${userId}/review/${reviewId}`
        : null
    );
  const ReviewCounts = reviewData?.review?._count.likes;
  const [createOnReview] = useMutation(
    `/api/user/${user_id}/review/${review_id}/create/likes`
  );
  const [createOnAllReivew] = useMutation(
    `/api/user/${userId}/review/${reviewId}/create/likes`
  );
  const handleClick = () => {
    if (isPost) {
      if (!data) return;
      mutate(
        {
          ...data,
          isLiked: !data.isLiked,
          post: {
            ...data?.post,
            _count: {
              ...data.post?._count,
              likes: data.isLiked
                ? data.post?._count.likes - 1
                : data.post?._count.likes + 1,
            },
          },
        },
        false
      );
      createOnPost({});
    }
    if (isReivew || isAllReivew) {
      if (!reviewData) return;
      reivewMutate(
        {
          ...reviewData,
          isLiked: !reviewData.isLiked,
          review: {
            ...reviewData.review,
            _count: {
              ...reviewData.review?._count,
              likes: reviewData.isLiked
                ? reviewData.review?._count.likes - 1
                : reviewData.review?._count.likes + 1,
            },
          },
        },
        false
      );
      if (isReivew) return createOnReview({});
      if (isAllReivew) return createOnAllReivew({});
    }
  };
  //
  return (
    <>
      <Cont>
        <IconBtn onClick={handleClick} isAllReivew={isAllReivew}>
          {data?.isLiked || reviewData?.isLiked ? (
            <Icons name="likes" type="solid" />
          ) : (
            <Icons name="likes" type="empty" />
          )}
        </IconBtn>
        <Counts>
          {isPost && <span>{PostCounts ? PostCounts : '0'}</span>}
          {(isReivew || isAllReivew) && (
            <span>{ReviewCounts ? ReviewCounts : '0'}</span>
          )}

          <span> Likes</span>
        </Counts>
      </Cont>
    </>
  );
};
const Cont = styled.article`
  gap: 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
const IconBtn = styled.button<{ isAllReivew: boolean | undefined }>`
  border: none;
  background-color: inherit;
  svg {
    width: ${(p) => (p.isAllReivew ? '25px' : '30px')};
    height: ${(p) => (p.isAllReivew ? '25px' : '30px')};
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
