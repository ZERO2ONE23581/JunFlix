import { Info } from './Info';
import styled from '@emotion/styled';
import { Avatar } from '../../Avatar';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import useMutation from '../../../libs/client/useMutation';
import { Modal } from '../../../../styles/global';
import { IEditPostForm } from '../../../types/post';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IQuery } from '../../../types/global';
import { ConfirmModal } from '../../Tools/Modal';

interface IEditPost extends IQuery {
  title: string;
  content: string;
  postAvatar: string;
  setEdit: Dispatch<SetStateAction<boolean>>;
}
export const EditPost = ({
  query,
  title,
  content,
  postAvatar,
  setEdit,
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
    `/api/user/${query.userId}/board/${query.boardId}/post/${query.postId}/edit`
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
  const Loading = avatarLoading ? avatarLoading : loading ? loading : false;
  useEffect(() => {
    if (data?.ok) {
      setEdit(false);
      alert('포스트를 수정했습니다.');
    }
  }, [data, router, setEdit]);
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <Cont>
          <Avatar
            id="editAvatar"
            avatar={postAvatar}
            avatarWatch={watch('editAvatar')!}
            register={register('editAvatar')}
          />
          <Info
            watch={watch}
            errors={errors}
            setValue={setValue}
            register={register}
            setError={setError}
            clearErrors={clearErrors}
            title={title}
            content={content}
            setUpdate={setUpdate}
            dataError={data?.error}
            postAvatar={postAvatar}
            setEdit={setEdit}
          />
        </Cont>
        {update && (
          <ConfirmModal
            loading={Loading}
            type="update-post"
            closeModal={setUpdate}
          />
        )}
      </form>
    </>
  );
};
const Cont = styled(Modal)`
  gap: 0;
  padding: 0;
  z-index: 103;
  width: 70vw;
  height: 80vh;
  min-width: 1000px;
  overflow: hidden;
  flex-direction: row;
  border: ${(p) => p.theme.border.thick};
  .editAvatar {
    .isPreivewTag,
    .noImageDiv,
    .isImageTag {
      width: 40vw;
      height: 80vh;
      min-width: 600px;
      min-height: 580px;
      border-right: ${(p) => p.theme.border.thick};
    }
  }
  .edit-post-info {
    width: 30vw;
    height: 80vh;
    min-width: 400px;
    min-height: 200px;
  }
`;
