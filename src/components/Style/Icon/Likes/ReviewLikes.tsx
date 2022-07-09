import useSWR from 'swr';
import { Svg } from '../../Svg/Svg';
import styled from '@emotion/styled';
import { Review } from '@prisma/client';
import useMutation from '../../../../libs/client/useMutation';

interface IGetPostWithCounts {
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
export interface ILikesBtn {
  USERID: number;
  REVIEWID: number;
}
export const ReviewLikes = ({ USERID, REVIEWID }: ILikesBtn) => {
  const { data, mutate } = useSWR<IGetPostWithCounts>(
    `/api/user/${USERID}/review/${REVIEWID}`
  );
  const Counts = data?.review?._count.likes;
  const [CreateLikes] = useMutation(
    `/api/user/${USERID}/review/${REVIEWID}/create/likes`
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
        {data?.isLiked && <Svg type={'solid-heart'} />}
        {!data?.isLiked && <Svg type={'unsolid-heart'} />}
        <span className="counts">{Counts ? Counts : null}</span>
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
