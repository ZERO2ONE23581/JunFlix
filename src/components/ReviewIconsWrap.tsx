import styled from '@emotion/styled';
import { IPostComment } from '../types/comments';
import { LikesBtn } from './Style/Icon/Likes/LikesBtn';
import { CommentIcon } from './Style/Icon/Comment/CommentIcon';

interface IIconWrap extends IPostComment {
  createCmt?: boolean;
}
export const PostIconWrap = ({
  USERID,
  BOARDID,
  POSTID,
  REVIEWID,
  createCmt,
}: IIconWrap) => {
  return (
    <Cont>
      <LikesBtn
        USERID={USERID}
        BOARDID={BOARDID}
        POSTID={POSTID}
        REVIEWID={REVIEWID}
      />
      <CommentIcon
        USERID={USERID}
        BOARDID={BOARDID}
        POSTID={POSTID}
        REVIEWID={REVIEWID}
      />
    </Cont>
  );
};
const Cont = styled.article`
  padding: 10px 20px;
  gap: 30px;
  display: flex;
  align-items: center;
  border-top: ${(p) => p.theme.border.thin};
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
