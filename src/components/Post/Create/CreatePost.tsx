import styled from '@emotion/styled';
import { Avatar } from '../../Avatar';
import { TopLayer } from './TopLayer';
import { Post } from '@prisma/client';
import { useRouter } from 'next/router';
import { PostInputs } from './PostInputs';
import { useForm } from 'react-hook-form';
import { IPostForm } from '../../../types/post';
import { SaveCreatePost } from './SaveCreatePost';
import { CancelCreatePost } from '../Edit/Cancel';
import useMutation from '../../../libs/client/useMutation';
import { Modal, DimBackground } from '../../../../styles/global';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface ICreatePostRes {
  post?: Post;
  ok: boolean;
  error?: string;
}
interface ICreatePostModalProps {
  openCreatePost: Dispatch<SetStateAction<boolean>>;
}
export const CreatePost = ({ openCreatePost }: ICreatePostModalProps) => {
  const {
    watch,
    setError,
    clearErrors,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostForm>({ mode: 'onBlur' });
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const [createPost, { data, loading }] = useMutation<ICreatePostRes>(
    `/api/user/${user_id}/board/${board_id}/post/create`
  );
  //
  const [next, setNext] = useState(false);
  const [undoPost, setUndoPost] = useState(false);
  const [saveCreate, setSaveCreate] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const avatar = watch('avatar');
  const [preview, setPreview] = useState('');
  const Loading = avatarLoading ? avatarLoading : loading ? loading : null;
  //
  const onValid = async ({ avatar, title, content }: IPostForm) => {
    if (loading) return;
    if (avatar && avatar.length > 0) {
      setAvatarLoading((p) => !p);
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
      setAvatarLoading((p) => !p);
      return createPost({ title, content, avatar: id });
    } else {
      return createPost({ title, content });
    }
  };
  //
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
    if (data?.error) alert(data.error);
    if (data?.ok) {
      openCreatePost(false);
    }
  }, [avatar, data, openCreatePost]);
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <Cont isNext={next}>
          <TopLayer
            next={next}
            setNext={setNext}
            undoPost={undoPost}
            setUndoPost={setUndoPost}
          />
          <Wrap>
            <Avatar
              avatar=""
              disabled={next}
              preview={preview}
              register={register('avatar')}
              size={{ width: '35vw', height: '64vh' }}
            />
            {next && (
              <PostInputs
                watch={watch}
                preview={preview}
                register={register}
                setError={setError}
                clearErrors={clearErrors}
                setSaveCreate={setSaveCreate}
                ERRORS_TITLE={errors.title}
                ERRORS_CONTENT={errors.content}
              />
            )}
          </Wrap>
        </Cont>

        {saveCreate && (
          <SaveCreatePost loading={Loading} closeModal={setSaveCreate} />
        )}
      </form>
      <DimBackground zIndex={101} onClick={() => setUndoPost(true)} />
      {undoPost && (
        <CancelCreatePost closePost={openCreatePost} closeModal={setUndoPost} />
      )}
    </>
  );
};
const Cont = styled(Modal)<{ isNext: boolean }>`
  min-width: 30vw;
  width: ${(p) => p.isNext && '60vw'};
  height: 70vh;
  z-index: 102;
  gap: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0;
`;
const Wrap = styled.article`
  display: flex;
  align-items: center;
`;
