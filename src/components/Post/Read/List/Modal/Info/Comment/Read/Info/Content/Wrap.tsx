import { Content } from '.';
import styled from '@emotion/styled';
import { CommentList } from '../../List';
import { IPostCmtQuery } from '../../../../../../../../../../types/post';

export interface IContentWrap extends IPostCmtQuery {
  createdAt: Date;
  content: string;
  username: string;
  userAvatar: string;
}
export const ContentWithCommnets = ({
  userId,
  postId,
  boardId,
  content,
  username,
  createdAt,
  userAvatar,
}: IContentWrap) => {
  return (
    <Cont>
      <Content
        content={content}
        username={username}
        createdAt={createdAt}
        userAvatar={userAvatar}
        type={{ isPost: true }}
      />
      <CommentList userId={userId} boardId={boardId} postId={postId} />
    </Cont>
  );
};
const Cont = styled.article`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  ::-webkit-scrollbar {
    display: none;
  }
  .post-content {
    padding: 20px;
    min-height: 80%;
    box-shadow: ${(p) => p.theme.boxShadow.nav};
    border-bottom: ${(p) => p.theme.border.thick};
  }
`;
