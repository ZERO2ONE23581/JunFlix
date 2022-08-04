import useSWR from 'swr';
import styled from '@emotion/styled';
import { Svg } from '../../../Tools/Svg';
import { useEffect, useState } from 'react';
import { IReviewCmt } from '../../../../types/review';

interface ICommentIcon {
  userId: number;
  reviewId: number;
}
export const CommentIcon = ({ userId, reviewId }: ICommentIcon) => {
  const { data } = useSWR<IReviewCmt>(`/api/user/${userId}/review/${reviewId}`);
  const [counts, setCounts] = useState(0);
  useEffect(() => {
    if (data?.ok) setCounts(data?.review?._count?.comments!);
  }, [data, setCounts]);
  return (
    <>
      <Cont>
        {Boolean(counts > 0) && <Svg type="solid-comment" size="2.5rem" />}
        {!Boolean(counts > 0) && <Svg type="unsolid-comment" size="2.5rem" />}
        <span className="counts"> {counts > 0 ? counts : null}</span>
      </Cont>
    </>
  );
};
const Cont = styled.div`
  position: relative;
  border: none;
  outline: none;
  background-color: inherit;
  svg {
    pointer-events: none;
  }
`;
