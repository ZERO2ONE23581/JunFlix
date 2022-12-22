import { useState } from 'react';
import { Modals } from './Modals';
import { PostGrid } from './Grid';
import styled from '@emotion/styled';
import { IPostType } from '../../../types/post';
import { ISetFixed } from '../../../../pages/_app';
import { useModalFixed } from '../../../libs/client/useTools';

interface IPostSchema extends ISetFixed {
  _data: {
    grid: number;
    theme: boolean;
    posts: IPostType[];
  };
}
export const PostSchema = ({ _data, setFixed }: IPostSchema) => {
  const { theme, posts, grid } = _data;
  const [modal, setModal] = useState('');
  const [postId, setPostId] = useState(0);
  const [cmtModal, setCmtModal] = useState(false);
  const post = posts?.find((item) => item.id === postId)!;
  const read = Boolean(modal === 'read' && post && !cmtModal);
  useModalFixed({ modal: read, setFixed });
  return (
    <Cont className="posts_schema">
      <PostGrid _data={{ grid, theme, posts, setPostId, setModal, setFixed }} />
      <Modals
        _edit={{ modal, theme, post, setModal }}
        _data={{ read, cmtModal, setFixed, setCmtModal }}
      />
    </Cont>
  );
};
const Cont = styled.section``;
