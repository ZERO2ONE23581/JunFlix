import styled from '@emotion/styled';
import { IconWithCreate } from './Comment/Create/Wrap';
import { TitleWithBtn } from './Comment/Read/Info/Title';
import { Dispatch, SetStateAction, useState } from 'react';
import { IPostCmtQuery } from '../../../../../../types/post';
import { BtnModal } from '../../../../Create/Setting/BtnModal';
import { ContentWithCommnets } from './Comment/Read/Info/Content/Wrap';

export interface IInfo extends IPostCmtQuery {
  title: string;
  content: string;
  createdAt: Date;
  username: string;
  userAvatar: string;
  postAvatar: string;
  setReadPost: Dispatch<SetStateAction<boolean>>;
  setEditPost: Dispatch<SetStateAction<boolean>>;
  setDeletePost: Dispatch<SetStateAction<boolean>>;
}
export const Info = ({
  userId,
  postId,
  boardId,
  title,
  content,
  username,
  createdAt,
  userAvatar,
  setReadPost,
  setEditPost,
  setDeletePost,
}: IInfo) => {
  const [setting, setSetting] = useState(false);
  return (
    <>
      <Cont className="read-post-info">
        <TitleWithBtn
          title={title}
          setting={setting}
          setSetting={setSetting}
          setReadPost={setReadPost}
        />
        <div className="main">
          <ContentWithCommnets
            userId={userId}
            postId={postId}
            boardId={boardId}
            content={content}
            username={username}
            createdAt={createdAt}
            userAvatar={userAvatar}
          />
          <IconWithCreate userId={userId} boardId={boardId} postId={postId} />
        </div>
      </Cont>

      {setting && (
        <BtnModal
          title={title}
          userId={userId}
          boardId={boardId}
          setSetting={setSetting}
          setReadPost={setReadPost}
          setEditPost={setEditPost}
          setDeletePost={setDeletePost}
        />
      )}
    </>
  );
};
const Cont = styled.article`
  border-right: ${(p) => p.theme.border.thin};
  border-bottom: ${(p) => p.theme.border.thin};
  .main {
    height: 92%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;
