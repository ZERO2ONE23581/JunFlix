import { PostGrid } from './Grid';
import { ReadPost } from './Modal';
import styled from '@emotion/styled';
import { UpdatePost } from '../Update';
import { DeletePost } from '../Delete';
import { CreatePost } from '../Create';
import { IPostType } from '../../../types/post';
import { Page } from '../../../../styles/global';
import { useUser } from '../../../libs/client/useUser';
import { Dispatch, SetStateAction, useState } from 'react';

interface IPostSchema {
  _data: {
    max_grid: number;
    theme: boolean;
    posts: IPostType[];
    create: boolean;
    setCreate: Dispatch<SetStateAction<boolean>>;
  };
}
export const PostSchema = ({ _data }: IPostSchema) => {
  const theme = _data?.theme!;
  const posts = _data?.posts!;
  const create = _data?.create!;
  const max_grid = _data?.max_grid!;
  const setCreate = _data?.setCreate!;
  //
  const { user_id } = useUser();
  const [modal, setModal] = useState('');
  const [postId, setPostId] = useState(0);
  const post = posts?.find((item) => item.id === postId)!;
  const isMyPost = Boolean(post?.host_id! === user_id);
  const onClick = (postID: number) => {
    setModal('read');
    setPostId(postID);
  };
  return (
    <>
      <PostGrid _data={{ theme, onClick, posts, max_grid }} />
      <ReadPost _data={{ theme, post, modal, setModal }} />
      <UpdatePost theme={theme} post={post} modal={modal} setModal={setModal} />
      <DeletePost
        _data={{ theme, modal, setModal, post_id: post?.id, isMyPost }}
      />
      <CreatePost
        theme={theme}
        open={create}
        closeModal={() => setCreate(false)}
      />
    </>
  );
};
