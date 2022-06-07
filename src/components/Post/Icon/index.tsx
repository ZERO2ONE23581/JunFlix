import styled from '@emotion/styled';
import { LikesIcon } from '../../Likes';
import { AllComments } from '../../Comment/AllComments';
import { CommentIcon } from '../../Comment/Icon';
import { CreateComment } from '../../Comment/Create';

export const LikesAndComments = () => {
  return (
    <Cont>
      <article className="icons-wrap">
        <LikesIcon />
        <CommentIcon />
      </article>
      <h1>해당 포스트에 댓글 남기기</h1>
      <CreateComment />
      <AllComments />
    </Cont>
  );
};
const Cont = styled.section`
  padding: 20px;
  border: 10px solid black;
  .icons-wrap {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
  }
  h1 {
    padding-left: 20px;
    font-size: 1.4rem;
    font-weight: 700;
    color: ${(p) => p.theme.color.font};
  }
`;
