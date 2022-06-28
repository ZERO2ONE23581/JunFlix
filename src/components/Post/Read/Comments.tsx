import styled from '@emotion/styled';
import { CommentList } from '../../Comment/CommentList';
import { CreateComments } from '../../Comment/Create/CreateComments';
import { LikeCommentWrap } from '../../Style/Icon/LikeCommentWrap';

export const Comments = () => {
  return (
    <Cont>
      <LikeCommentWrap type="post" reviewId={null} userId={null} />
      <h1>해당 포스트에 댓글 남기기</h1>
      <CreateComments type="post" />
      <CommentList isPost />
    </Cont>
  );
};
const Cont = styled.section`
  h1 {
    font-size: 1.3rem;
    margin-top: 20px;
  }
`;
