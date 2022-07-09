import styled from '@emotion/styled';
import { IPostComment } from '../../../../types/comments';
import { LikesBtn } from '../../../Style/Icon/Likes/LikesBtn';
import { CommentIcon } from '../../../Style/Icon/Comment/CommentIcon';

export const PostLikesNCmts = ({ post }: IPostComment) => {
  return (
    <Cont>
      <LikesBtn
        REVIEWID={0}
        POSTID={post?.id}
        USERID={post?.UserID}
        BOARDID={post?.BoardID}
      />
      <CommentIcon
        REVIEWID={0}
        POSTID={post?.id}
        USERID={post?.UserID}
        BOARDID={post?.BoardID}
      />
    </Cont>
  );
};
const Cont = styled.article`
  padding: 10px 20px;
  gap: 30px;
  display: flex;
  align-items: center;
  .counts {
    top: -8px;
    right: -10px;
    position: absolute;
    font-size: 15px;
    font-weight: 550;
    color: ${(p) => p.theme.color.logo};
  }
  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;
