import { useState } from 'react';
import { PostGrid } from './Grid';
import styled from '@emotion/styled';
import { UpdatePost } from '../Update';
import { DeletePost } from '../Delete';
import { IPostType } from '../../../types/post';
import { CommentModal } from '../../Comment/Modal';

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
  const [cmtModal, setCmtModal] = useState(false);
  const post = posts?.find((item) => item.id === postId)!;
  const post_id = post?.id!;
  const host_id = post?.host_id!;
  const layoutId = post?.id! + '';
  const isBlocked = post?.onPrivate!;
  return (
    <Cont className="posts_schema">
      <PostGrid
        _data={{ grid, theme, posts, post }}
        _set={{ setPostId, setCmtModal, setModal }}
      />
      <>
        <UpdatePost _data={{ modal, theme, post, setModal }} />
        <DeletePost _data={{ modal, theme, post, setModal }} />
        <CommentModal
          _data={{
            theme,
            post_id,
            host_id,
            setModal,
            layoutId,
            cmtModal,
            isBlocked,
            setCmtModal,
          }}
        />
      </>
    </Cont>
  );
};
const Cont = styled.section`
  overflow: auto;
  max-height: 165vh;
`;
