import { useState } from 'react';
import { PostGrid } from './Grid';
import { UpdatePost } from '../Update';
import { DeletePost } from '../Delete';
import { ReadPost } from './Read/Modal';
import { IPostType } from '../../../types/post';
import { CommentModal } from '../../Comment/Modal';
import { ISetFixed } from '../../../../pages/_app';

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
  const post = posts?.find((item) => item.id === postId)!;
  const onClickBox = (id: number) => {
    setPostId(id);
    setFixed(true);
    setModal('read');
  };
  const post_id = post?.id!;
  const host_id = post?.host_id!;
  const layoutId = post?.id! + '';
  const _modal = { post, modal, theme, setModal };
  const [cmtModal, setCmtModal] = useState(false);
  const open = Boolean(modal === 'read' && post && !cmtModal);
  return (
    <>
      <PostGrid
        setFixed={setFixed}
        _data={{ grid, theme, posts, onClickBox }}
      />
      <ReadPost
        setFixed={setFixed}
        _data={{ theme, post, layoutId }}
        _modal={{ modal: open, setModal, setCmtModal }}
      />
      <CommentModal
        _data={{ theme, post_id, host_id, layoutId }}
        _modal={{ cmtModal, setModal, setCmtModal }}
      />
      <UpdatePost _data={{ ..._modal }} />
      <DeletePost _data={{ ..._modal }} />
    </>
  );
};
