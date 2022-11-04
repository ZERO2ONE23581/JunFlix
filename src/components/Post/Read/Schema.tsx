import { useState } from 'react';
import { PostGrid } from './Grid';
import { ReadPost } from './Modal';
import { UpdatePost } from '../Update';
import { DeletePost } from '../Delete';
import { IPostType } from '../../../types/post';

interface IPostSchema {
  _data: {
    grid: number;
    theme: boolean;
    posts: IPostType[];
  };
}
export const PostSchema = ({ _data }: IPostSchema) => {
  const { theme, posts, grid } = _data;
  const [modal, setModal] = useState('');
  const [postId, setPostId] = useState(0);
  const post = posts?.find((item) => item.id === postId)!;
  const onClickBox = (id: number) => {
    setPostId(id);
    setModal('read');
  };
  const _modal = { post, modal, theme, setModal };
  return (
    <>
      <PostGrid _data={{ grid, theme, posts, onClickBox }} />
      <ReadPost _data={{ ..._modal }} />
      <UpdatePost _data={{ ..._modal }} />
      <DeletePost _data={{ ..._modal }} />
    </>
  );
};
