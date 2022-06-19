import styled from '@emotion/styled';
import { CommentIconBtn } from '../Comment';
import { LikesIconBtn } from '../Likes';

export const LikeCommentWrap = ({ type, userId, reviewId }: any) => {
  return (
    <Cont>
      <IconWrap>
        {type === 'post' && (
          <>
            <LikesIconBtn type="post" />
            <CommentIconBtn type="post" />
          </>
        )}
        {type === 'review' && (
          <>
            <LikesIconBtn type="review" userId={userId} reviewId={reviewId} />
            <CommentIconBtn type="review" userId={userId} reviewId={reviewId} />
          </>
        )}
      </IconWrap>
    </Cont>
  );
};
const Cont = styled.section`
  margin-top: 15px;
`;
const IconWrap = styled.article`
  gap: 20px;
  display: flex;
  align-items: center;
`;
