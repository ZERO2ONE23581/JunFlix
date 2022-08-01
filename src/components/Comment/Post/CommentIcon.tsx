import useSWR from 'swr';
import styled from '@emotion/styled';
import { Svg } from '../../Tools/Svg';
import { useEffect, useState } from 'react';
import { IPostComment } from '../../../types/comments';
import { IQuery } from '../../../types/global';

export const CommentIcon = ({ query }: IQuery) => {
  const { data } = useSWR<IPostComment>(
    `/api/user/${query.userId}/board/${query.boardId}/post/${query.postId}`
  );
  const [counts, setCounts] = useState(0);
  useEffect(() => {
    if (data?.ok) setCounts(data?.post?._count?.comments!);
  }, [data, setCounts]);

  return (
    <Cont>
      {Boolean(counts > 0) && <Svg type="solid-comment" size="1.7rem" />}
      {!Boolean(counts > 0) && <Svg type="unsolid-comment" size="1.7rem" />}
      <span className="counts"> {counts > 0 ? counts : null}</span>
    </Cont>
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
