import styled from '@emotion/styled';
import { Top } from '../../../../Comment/Post/Read/Info/Top';
import { Dispatch, SetStateAction, useState } from 'react';
import { Icons } from '../../../../Comment/Post/Create/Wrap/Icons';
import { CreateComment } from '../../../../Comment/Post/Create/Wrap/Comment';
import { Content } from '../../../../Comment/Post/Read/Info/Content';
import { CommentList } from '../../../../Comment/Post/Read/List';
import { PostModel } from '../../../../../types/post';
import { IQuery } from '../../../../../types/global';
import { ModalBtn } from '../../../../Tools/Modal/Btn/Post';

export interface IInfo extends IQuery {
  post: PostModel;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setModal: Dispatch<SetStateAction<boolean>>;
  setDelete: Dispatch<SetStateAction<boolean>>;
}
export const Info = ({ post, query, setModal, setEdit, setDelete }: IInfo) => {
  const [setting, setSetting] = useState(false);
  return (
    <>
      {post && query && (
        <Cont className="read-post-info">
          <Top
            title={post.title}
            setting={setting}
            setSetting={setSetting}
            setModal={setModal}
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
          setModal={setModal}
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
