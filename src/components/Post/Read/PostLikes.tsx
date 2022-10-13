import useSWR from 'swr';
import { Svg } from '../../../Tools/Svg';
import styled from '@emotion/styled';
import { Post, Review } from '@prisma/client';
import useMutation from '../../../libs/client/useMutation';
import { IQuery } from '../../../types/global';

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
export const LikeIcon = ({ query, theme }: any) => {
  const { data, mutate } = useSWR<IGetPostWithCounts>(
    `/api/user/${query.userId}/board/${query.boardId}/post/${query.postId}`
  );
  const [create] = useMutation(
    `/api/user/${query.userId}/board/${query.boardId}/post/${query.postId}/create/likes`
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
    create({});
  };

  return (
    <>
      <Cont onClick={onClick}>
        {data?.isLiked && (
          <Svg type={'solid-heart'} size="2rem" theme={theme} />
        )}
        {!data?.isLiked && (
          <Svg type={'unsolid-heart'} size="2rem" theme={theme} />
        )}
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
