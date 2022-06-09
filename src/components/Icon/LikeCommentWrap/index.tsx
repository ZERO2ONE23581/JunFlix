import styled from '@emotion/styled';
import { CommentIcon } from '../Comment';
import { LikesIcon } from '../Likes';

export const LikeCommentWrap = ({ type, userId, reviewId }: any) => {
  return (
    <Cont>
      <IconWrap>
        {type === 'post' && (
          <>
            <LikesIcon type="post" />
            <CommentIcon type="post" />
          </>
        )}
        {type === 'review' && (
          <>
            <LikesIcon type="review" userId={userId} reviewId={reviewId} />
            <CommentIcon type="review" userId={userId} reviewId={reviewId} />
          </>
        )}
      </IconWrap>
    </Cont>
  );
};
const Cont = styled.section``;
const IconWrap = styled.article`
  gap: 20px;
  display: flex;
  align-items: center;
`;
