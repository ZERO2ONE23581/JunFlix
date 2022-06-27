import styled from '@emotion/styled';
import { LikeCommentWrap } from '../../../Style/Icon/LikeCommentWrap';
import { CommentList } from '../../Comment/CommentList';
import { CreateComments } from '../../Comment/Create/CreateComments';

export const ReviewComments = () => {
  return (
    <>
      <Cont>
        <LikeCommentWrap type="review" reviewId={null} userId={null} />
        <h1>해당 리뷰에 댓글 남기기</h1>
        <CreateComments type="review" />
        <CommentList isReview />
      </Cont>
    </>
  );
};
const Cont = styled.article``;
