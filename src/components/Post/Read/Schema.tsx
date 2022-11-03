import { PostGrid } from './Grid';
import { ReadPost } from './Modal';
import { UpdatePost } from '../Update';
import { DeletePost } from '../Delete';
import { CreatePost } from '../Create';
import { IPostType } from '../../../types/post';
import { useUser } from '../../../libs/client/useUser';
import { Dispatch, SetStateAction, useState } from 'react';
import styled from '@emotion/styled';

interface IPostSchema {
  _data: {
    theme: boolean;
    create: boolean;
    max_grid: number;
    isOrganize?: boolean;
    posts: IPostType[];
    hideCreate?: boolean;
    setCreate: Dispatch<SetStateAction<boolean>>;
  };
}
export const PostSchema = ({ _data }: IPostSchema) => {
  const theme = _data?.theme!;
  const posts = _data?.posts!;
  const create = _data?.create!;
  const max_grid = _data?.max_grid!;
  const isOrganize = _data?.isOrganize!;
  const setCreate = _data?.setCreate!;
  const hideCreate = _data?.hideCreate!;
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
    <Cont>
      <PostGrid
        _data={{
          theme,
          posts,
          onClick,
          max_grid,
          hideCreate,
          setCreate,
          isOrganize,
          host_id: user_id!,
        }}
      />
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
    </Cont>
  );
};
const Cont = styled.section`
  .test {
    width: fit-content;
    top: -5rem;
    left: 0rem;
    position: absolute;
  }
  //border: 10px solid cornflowerblue;
  position: relative;
  .posts-grid {
    //margin-top: 4rem;
  }
  .icons {
    top: -3rem;
    right: 1rem;
    //border: 5px solid red;
  }
`;
