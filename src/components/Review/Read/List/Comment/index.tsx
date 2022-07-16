import styled from '@emotion/styled';
import { IReview } from '../../../../../types/review';
import { CommentList } from '../../../Comment/Read/CmtList';
import { CreateComment } from '../../../Comment/Create/Comment';

export const CommentWrap = ({ review }: IReview) => {
  return (
    <Cont className="comment-wrap">
      <div className="wrap">
        <CreateComment review={review!} />
        <CommentList review={review!} />
      </div>
    </Cont>
  );
};
const Cont = styled.article`
  border-top: 1px solid #dfe6e9;
  min-height: 20vh;
  .wrap {
    padding: 20px;
    min-width: 800px;
  }
`;
