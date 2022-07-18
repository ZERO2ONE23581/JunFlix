import { Info } from './Info';
import { SaveEdit } from './Save';
import styled from '@emotion/styled';
import { Avatar } from '../../Avatar';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import useMutation from '../../../libs/client/useMutation';
import { Modal, DimBackground } from '../../../../styles/global';
import { IEditPostForm, IPostCmtQuery } from '../../../types/post';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IEditPost extends IPostCmtQuery {
  title: string;
  content: string;
  postAvatar: string;
  setEditPost: Dispatch<SetStateAction<boolean>>;
}
export const EditPost = ({
  title,
  content,
  postAvatar,
  userId,
  postId,
  boardId,
  setEditPost,
}: IEditPost) => {
  const {
    watch,
    setError,
    clearErrors,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditPostForm>({ mode: 'onBlur' });

  const router = useRouter();
  const [edit, { data, loading }] = useMutation(
    `/api/user/${userId}/board/${boardId}/post/${postId}/edit`
  );
  const [update, setUpdate] = useState(false);
  const onValid = async ({ editAvatar, title, content }: IEditPostForm) => {
    if (loading) return;
    if (editAvatar && editAvatar.length > 0) {
      setAvatarLoading((p) => !p);
      const { uploadURL } = await (await fetch(`/api/file`)).json();
      const form = new FormData();
      form.append('file', editAvatar[0]);
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: 'POST',
          body: form,
        })
      ).json();
      setAvatarLoading((p) => !p);
      return edit({ title, content, avatar: id });
    } else {
      return edit({ title, content });
    }
  };
  const [avatarLoading, setAvatarLoading] = useState(false);
  const Loading = avatarLoading ? avatarLoading : loading ? loading : null;
  useEffect(() => {
    if (data?.ok) {
      setEditPost(false);
      alert('포스트를 수정했습니다.');
    }
  }, [data, router, setEditPost]);
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <Cont>
          <Avatar
            id="editAvatar"
            avatar={postAvatar}
            avatarWatch={watch('editAvatar')}
            register={register('editAvatar')}
          />
          <Info
            watch={watch}
            setValue={setValue}
            register={register}
            setError={setError}
            clearErrors={clearErrors}
            title={title}
            content={content}
            setUpdate={setUpdate}
            postAvatar={postAvatar}
            setEditPost={setEditPost}
            DataError={data?.error}
            TitleError={errors.title?.message!}
            ContentError={errors.content?.message!}
          />
        </Cont>
        {update && <SaveEdit loading={Loading} closeModal={setUpdate} />}
      </form>
      <DimBackground zIndex={102} onClick={() => setEditPost(false)} />
    </>
  );
};
const Cont = styled(Modal)`
  gap: 0;
  padding: 0;
  z-index: 103;
  width: 70vw;
  height: 80vh;
  border: none;
  min-width: 1000px;
  overflow: hidden;
  flex-direction: row;
  .editAvatar {
    .noImageCont,
    .isImageCont {
      width: 40vw;
      height: 80vh;
      min-width: 600px;
      min-height: 640px;
    }
  }
  .edit-post-info {
    width: 30vw;
    height: 80vh;
    min-width: 400px;
    min-height: 200px;
  }
`;
