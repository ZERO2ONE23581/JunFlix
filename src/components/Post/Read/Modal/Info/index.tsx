import styled from '@emotion/styled';
import { Top } from './Comment/Read/Info/Layer/Top';
import { Dispatch, SetStateAction, useState } from 'react';
import { ModalBtn } from '../../../Edit/Setting/ModalBtn';
import { Icons } from './Comment/Create/Wrap/Icons';
import { CreateComment } from './Comment/Create/Wrap/Comment';
import { Content } from './Comment/Read/Info/Content';
import { CommentList } from './Comment/Read/List';
import { PostModel } from '../../../../../types/post';
import { IQuery } from '../../../../../types/global';

export interface IInfo extends IQuery {
  post: PostModel;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setReadPost: Dispatch<SetStateAction<boolean>>;
  setDelete: Dispatch<SetStateAction<boolean>>;
}
export const Info = ({
  post,
  query,
  setReadPost,
  setEdit,
  setDelete,
}: IInfo) => {
  const [setting, setSetting] = useState(false);
  return (
    <>
      {post && query && (
        <Cont className="read-post-info">
          <Top
            title={post.title}
            setting={setting}
            setSetting={setSetting}
            setReadPost={setReadPost}
          />
          <Main>
            <Content
              content={post.content!}
              username={post.user.username!}
              userAvatar={post.user.avatar!}
              date={{
                createdAt: post.createdAt!,
                updatedAt: post.updatedAt!,
              }}
            />
            <CommentList query={query} />
          </Main>
          <Bottom>
            <Icons query={query} />
            <CreateComment query={query} />
          </Bottom>
        </Cont>
      )}

      {setting && (
        <ModalBtn
          query={query}
          title={post?.title!}
          setSetting={setSetting}
          setReadPost={setReadPost}
          setEdit={setEdit}
          setDelete={setDelete}
        />
      )}
    </>
  );
};
const Cont = styled.article`
  height: 92%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: ${(p) => p.theme.border.thin};
  border-bottom: ${(p) => p.theme.border.thin};
`;
const Main = styled.article`
  height: 100%;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Bottom = styled.article`
  padding-top: 5px;
  color: ${(p) => p.theme.color.bg};
  background-color: ${(p) => p.theme.color.font};
  svg {
    fill: ${(p) => p.theme.color.bg};
  }
`;
