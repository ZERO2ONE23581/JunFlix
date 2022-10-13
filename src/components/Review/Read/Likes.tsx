import useSWR from 'swr';
import styled from '@emotion/styled';
import { Svg } from '../../../Tools/Svg';
import { IReviewLikes } from '../../../types/review';
import useMutation from '../../../libs/client/useMutation';

export interface ILikesBtn {
  userId: number;
  reviewId: number;
  theme: boolean;
}
export const LikeIcon = ({ userId, reviewId, theme }: ILikesBtn) => {
  const { data, mutate } = useSWR<IReviewLikes>(
    `/api/user/${userId}/review/${reviewId}`
  );
  const Counts = data?.review?._count.likes;
  const [CreateLikes] = useMutation(
    `/api/user/${userId}/review/${reviewId}/create/likes`
  );
  const onClick = () => {
    if (!data) return;
    mutate(
      {
        ...data,
        isLiked: !data.isLiked,
        review: {
          ...data?.review,
          _count: {
            ...data.review?._count,
            likes: data.isLiked
              ? data.review?._count.likes - 1
              : data.review?._count.likes + 1,
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
        {data?.isLiked && (
          <Svg
            theme={theme}
            type={'solid-heart'}
            size="2.5rem"
            fill="#e74c3c"
          />
        )}
        {!data?.isLiked && (
          <Svg theme={theme} type={'unsolid-heart'} size="2.5rem" />
        )}
        <span className="counts">{Counts ? Counts : null}</span>
      </Cont>
    </>
  );
};
const Cont = styled.button`
  border: none;
  outline: none;
  position: relative;
  background-color: inherit;
`;
