import styled from '@emotion/styled';
import { CreateComment } from './Comment';
import { IPostCmtQuery } from '../../Read/List';
import { LikeIcon } from '../../../../../../../../Style/Icon/Likes/Post';
import { CommentIcon } from '../../../../../../../../Style/Icon/Comment/Post';

export const IconWithCreate = ({ userId, postId, boardId }: IPostCmtQuery) => {
  return (
    <Cont>
      <Icon>
        <LikeIcon postId={postId} userId={userId} boardId={boardId} />
        <CommentIcon postId={postId} userId={userId} boardId={boardId} />
      </Icon>
      <CreateComment postId={postId} userId={userId} boardId={boardId} />
    </Cont>
  );
};
const Cont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top: 2px double ${(p) => p.theme.color.logo};
`;
const Icon = styled.article`
  gap: 30px;
  display: flex;
  padding: 12px 20px;
  align-items: center;
  .counts {
    top: -8px;
    right: -10px;
    position: absolute;
    font-size: 15px;
    font-weight: 550;
    color: ${(p) => p.theme.color.logo};
  }
`;
