import useSWR from 'swr';
import { Svg } from '../../../Svg/Svg';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Post, Review } from '@prisma/client';
import useMutation from '../../../../../libs/client/useMutation';
import { IconBtn } from '../../../Button/IconBtn';
import { LikeSvg } from '../LikeSvg';

interface IGetPostWithCounts {
  ok: boolean;
  error?: string;
  isLiked?: boolean;
  isComments?: boolean;
  post: CountsInPost;
  review: CountsInReview;
}
interface CountsInPost extends Post {
  _count: {
    likes: number;
    comments: number;
  };
}
interface CountsInReview extends Review {
  _count: {
    likes: number;
    comments: number;
  };
}
export interface ILikesBtn {
  userId: number;
  boardId: number;
  postId: number;
}
export const LikeIcon = ({ userId, boardId, postId }: ILikesBtn) => {
  const { data, mutate } = useSWR<IGetPostWithCounts>(
    `/api/user/${userId}/board/${boardId}/post/${postId}`
  );
  const [CreateLikes] = useMutation(
    `/api/user/${userId}/board/${boardId}/post/${postId}/create/likes`
  );
  const onClick = () => {
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
    CreateLikes({});
  };

  return (
    <>
      <Cont onClick={onClick}>
        {data?.isLiked && <Svg type={'solid-heart'} size="1.7rem" />}
        {!data?.isLiked && <Svg type={'unsolid-heart'} size="1.7rem" />}
        <span className="counts">
          {data?.post?._count.likes ? data?.post?._count.likes : null}
        </span>
      </Cont>
    </>
  );
};
const Cont = styled.button`
  position: relative;
  border: none;
  outline: none;
  background-color: inherit;
  div {
    .solid-heart {
      fill: #e74c3c;
    }
  }
`;
