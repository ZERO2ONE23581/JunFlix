import styled from '@emotion/styled';
import { CommentList } from '../../Comment/CommentList';
import { CreateComments } from '../../Comment/Create/CreateComments';

interface IReadComments {
  isPost: boolean;
  isReview: boolean;
}
export const ReadComments = ({ isPost, isReview }: IReadComments) => {
  return (
    <Cont>
      {/* <h1>해당 {isPost ? '포스트' : isReview ? '리뷰' : null}에 댓글 남기기</h1> */}
      <CreateComments type="post" />
      {isPost && <CommentList isPost />}
      {isReview && <CommentList isReview />}
    </Cont>
  );
};
const Cont = styled.section`
  border: 3px solid blueviolet;
  padding: 2% 20%;
  h1 {
    font-size: 1.3rem;
    margin-left: 3em;
  }
`;
