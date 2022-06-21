import useSWR from 'swr';
import { Comments } from './Comments';
import { useRouter } from 'next/router';
import { Btn } from '../../Style/Button';
import { useForm } from 'react-hook-form';
import { PostInfoBtnWrap } from './BtnWrap';
import { useEffect, useState } from 'react';
import { InputWrap } from '../../Style/Input';
import { ErrorMsg } from '../../Style/ErrMsg';
import { PostAvatar } from './CreatePostAvatar';
import { PostInputs } from './CreatePostInputs';
import { MutationRes } from '../../../types/mutation';
import { Form, ModalSchema, Page } from '../../../../styles/global';
import useMutation from '../../../libs/client/useMutation';
import { IEditPostForm, IGetPost } from '../../../types/post';
import { DeleteCommentModal } from '../Comment/Delete/DeleteCommentModal';
import { Post } from '@prisma/client';
import styled from '@emotion/styled';
import { HostIcon } from '../Avatar/Profile';

interface IPostDetailProps {
  post: Post;
}

export const PostDetail = ({ post }: IPostDetailProps) => {
  const router = useRouter();
  const { user_id, board_id, post_id } = router.query;
  const [editPost, { data, loading }] = useMutation<MutationRes>(
    `/api/user/${user_id}/board/${board_id}/post/${post_id}/edit`
  );
  //
  const [edit, setEdit] = useState(false);
  const [preview, setPreview] = useState('');
  const [openSetup, setOpenSetup] = useState(false);
  const [openDelModal, setOpenDelModal] = useState(false);
  //
  const {
    watch,
    setValue,
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditPostForm>({ mode: 'onSubmit' });
  const avatar = watch('avatar');
  const onValid = async ({ avatar, title, content }: IEditPostForm) => {
    if (loading) return;
    if (avatar && avatar.length > 0) {
      const { uploadURL } = await (await fetch(`/api/file`)).json();
      const form = new FormData();
      form.append('file', avatar[0]);
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: 'POST',
          body: form,
        })
      ).json();
      editPost({ title, content, avatar: id });
    } else {
      editPost({ title, content });
    }
  };
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
    if (post) {
      if (post.title) setValue('title', post.title);
      if (post.content) setValue('content', post.content);
      if (post.createdAt) setValue('createdAt', post.createdAt);
    }
    if (data?.ok)
      setTimeout(() => {
        router.reload();
      }, 1000);
  }, [avatar, setValue, post, data]);
  //
  return (
    <>
      <Cont>
        <form onSubmit={handleSubmit(onValid)}>
          <PostInfoBtnWrap
            edit={edit}
            setEdit={setEdit}
            loading={loading}
            openSetup={openSetup}
            setOpenSetup={setOpenSetup}
            setOpenDelModal={setOpenDelModal}
          />
          <article className="wrapper">
            <PostAvatar
              disabled
              preview={preview}
              register={register('avatar')}
            />
            <article className="wrap">
              <HostIcon size={40} />
              <PostInputs
                watch={watch}
                maxTitle={20}
                maxCnt={1000}
                register={register}
                getValues={getValues}
                ErrCnt={errors.content?.message}
                ErrTitle={errors.title?.message}
              />
            </article>
          </article>
          <InputWrap
            id="createdAt"
            label="Create At"
            disabled={true}
            register={register('createdAt')}
          />
          {errors.avatar && <ErrorMsg error={errors.avatar.message} />}
          {data?.error && <ErrorMsg error={data.error} />}
          {edit && <Btn loading={loading} name="Edit Post" type="submit" />}
        </form>
      </Cont>
      <Comments />
      {openDelModal && (
        <DeleteCommentModal type="post" setOpenDelModal={setOpenDelModal} />
      )}
    </>
  );
};
const Cont = styled.article`
  border-radius: 5px;
  border: ${(p) => p.theme.border};
  color: ${(p) => p.theme.color.font};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
  .wrapper {
    padding: 20px 40px;
    padding-bottom: 0;
    gap: 30px;
    display: flex;
    align-items: center;
    .wrap {
      gap: 20px;
      width: 330px;
      height: 400px;
      display: flex;
      flex-direction: column;
    }
  }
`;
