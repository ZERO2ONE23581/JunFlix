import styled from '@emotion/styled';
import { LikesIcon } from '../../Likes';
import { AllComments } from '../../Comment/AllComments';
import { CommentIcon } from '../../Comment/Icon';
import { CreateComment } from '../../Comment/Create';

export const LikesAndComments = ({ type }: any) => {
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
            <LikesIcon type="review" />
            <CommentIcon type="review" />
          </>
        )}
      </IconWrap>

      <h1>
        {type === 'post'
          ? '해당 포스트에 댓글 남기기'
          : type === 'review'
          ? '해당 리뷰에 댓글 남기기'
          : null}
      </h1>
      <CreateComment />
      <AllComments />
    </Cont>
  );
};
const Cont = styled.section`
  padding: 20px;
  border: 10px solid black;
  h1 {
    padding-left: 20px;
    font-size: 1.4rem;
    font-weight: 700;
    color: ${(p) => p.theme.color.font};
  }
`;
const IconWrap = styled.article`
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;
