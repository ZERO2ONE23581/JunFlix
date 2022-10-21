import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { PostModal } from './post_modal';
import { GridBox } from './post_grid_box';
import { IPostType } from '../../../types/post';
import { Grid, Modal } from '../../../../styles/global';
import { UpdatePostModal } from '../update/update_post_modal';
import useMutation from '../../../libs/client/useMutation';
import useUser from '../../../libs/client/useUser';
import { OverlayBg } from '../../../Tools/overlay';
import { LoadingModal } from '../../../Tools/Modal/loading_modal';
import { Btn } from '../../../Tools/Button';
import { Svg } from '../../../Tools/Svg';
import { color } from '../../../../styles/variants';
import { MsgModal } from '../../../Tools/msg_modal';
import { NoData } from '../../../Tools/NoData';

interface IPostGrid {
  theme: boolean;
  open: boolean;
  posts: IPostType[];
}

export const PostGrid = ({ posts, theme, open }: IPostGrid) => {
  const { loggedInUser } = useUser();
  const [savedId, setSavedId] = useState(0);
  const [update, setUpdate] = useState(false);
  const post = posts?.find((e) => e.id === savedId);
  const isMyPost = Boolean(loggedInUser?.id === post?.host?.id!);
  //
  const [msg, setMsg] = useState('');
  const [delPost, setDelPost] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [delete_post, { data, loading }] = useMutation(
    `/api/post/${post?.id}/delete`
  );
  const handleSubmit = () => {
    if (loading) return;
    if (!isMyPost) return;
    if (!post?.id) return;
    setLoading(true);
    return delete_post({ isDelete: true });
  };
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
        setDelPost(false);
        setSavedId(0);
        if (data.error) setMsg(data.error);
        if (data.ok) setMsg('is_deleted');
      }, 1000);
    }
  }, [data, setLoading]);
  const gridSize = posts?.length > 6 ? 6 : posts?.length;
  return (
    <>
      {open && (
        <Cont className="post_grid" size={gridSize}>
          {posts?.map((post) => (
            <GridBox
              key={post.id}
              theme={theme}
              layoutId={post.id + ''}
              onClick={() => setSavedId(post.id)}
              post={{
                id: post.id,
                title: post.title,
                image: post.post_image,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
              }}
            />
          ))}
        </Cont>
      )}
      {open && posts?.length === 0 && <NoData theme={theme} type="post" />}

      <PostModal
        post={post}
        key={savedId}
        theme={theme}
        savedId={savedId}
        isMyPost={isMyPost}
        closeModal={() => setSavedId(0)}
        updatePost={() => setUpdate(true)}
        clickDelete={() => setDelPost(true)}
      />

      <UpdatePostModal
        post={post!}
        theme={theme}
        modal={Boolean(update && post)}
        closeModal={() => setUpdate(false)}
      />

      {delPost && (
        <>
          {!Loading && (
            <DelPostModal
              exit="exit"
              initial="initial"
              animate="animate"
              custom={theme}
              layoutId={post?.id + ''}
              variants={del_modal_var}
            >
              <Svg
                type="close"
                theme={theme}
                onClick={() => setDelPost(false)}
              />
              <h2>
                <span className="kor">
                  <span>이 포스트를 삭제하시겠습니까?</span>
                  <span className="small">
                    * 포스트는 삭제 후 복구가 불가합니다.
                  </span>
                </span>
                <span className="eng">
                  <span>Do you like to delete this post?</span>
                  <span className="small">
                    * The post can not be recoverd after this action.
                  </span>
                </span>
              </h2>
              <form onSubmit={handleSubmit}>
                <Btn type="submit" item={{ theme, name: 'Delete' }} />
              </form>
            </DelPostModal>
          )}
          {Loading && <LoadingModal theme={theme} zindex={112} />}
          <OverlayBg
            dark={0.5}
            zIndex={112}
            closeModal={() => setDelPost(false)}
          />
          <MsgModal msg={msg} theme={theme} closeModal={() => setMsg('')} />
        </>
      )}
    </>
  );
};

const DelPostModal = styled(Modal)`
  z-index: 113;
  button {
    width: 150px;
    font-size: 1.3rem;
    padding: 10px 20px;
  }
  h2 {
    //border: 2px solid pink;
    text-align: center;
    font-size: 1.4rem;
    .small {
      opacity: 0.7;
      font-size: 1.3rem;
      font-style: italic;
    }
    span {
      display: block;
      line-height: 30px;
    }
    > span {
      padding: 10px;
    }
  }
`;

const Cont = styled(Grid)`
  width: 60vw;
  min-width: 800px;
`;
const del_modal_var = {
  initial: () => ({
    opacity: 0,
  }),
  animate: (theme: boolean) => ({
    opacity: 1,
    color: '#E50914',
    border: '3px solid #E50914',
    backgroundColor: color(!theme),
    transition: { duration: 0.3 },
  }),
  exit: () => ({
    opacity: 0,
  }),
};
