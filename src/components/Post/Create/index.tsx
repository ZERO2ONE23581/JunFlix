import { Info } from './Info';
import { Layer } from './Layer';
import styled from '@emotion/styled';
import { Avatar } from '../../Avatar';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { ErrorMsg } from '../../Tools/Errors';
import { IPostForm } from '../../../types/post';
import { MutationRes } from '../../../types/mutation';
import useMutation from '../../../libs/client/useMutation';
import { Modal, DimBackground } from '../../../../styles/global';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ConfirmModal } from '../../Tools/Modal';

interface ICreatePost {
  setCreate: Dispatch<SetStateAction<boolean>>;
}
export const CreatePost = ({ setCreate }: ICreatePost) => {
  const {
    watch,
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostForm>({ mode: 'onBlur' });
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const [createPost, { data, loading }] = useMutation<MutationRes>(
    `/api/user/${user_id}/board/${board_id}/post/create`
  );
  const [next, setNext] = useState(false);
  const [save, setSave] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const Loading = avatarLoading ? true : loading ? true : false;

  const onValid = async ({ createAvatar, title, content }: IPostForm) => {
    if (loading) return;
    if (createAvatar && createAvatar.length > 0) {
      setAvatarLoading((p) => !p);
      const { uploadURL } = await (await fetch(`/api/file`)).json();
      const form = new FormData();
      form.append('file', createAvatar[0]);
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

  useEffect(() => {
    if (!next) {
      clearErrors!('title');
      clearErrors!('content');
    }
  }, [next, clearErrors]);
  useEffect(() => {
    if (data?.ok) {
      setSave(false);
      setCreate(false);
      alert('새로운 포스트를 생성했습니다.');
    }
  }, [data, setCreate, setSave]);

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Cont isNext={next}>
        <Layer
          next={next}
          cancel={cancel}
          setNext={setNext}
          setCancel={setCancel}
        />
        <Main isNext={next}>
          <Avatar
            disabled={next}
            id="createAvatar"
            register={register('createAvatar')}
            avatarWatch={watch('createAvatar')!}
          />
          {next && (
            <Info
              watch={watch}
              errors={errors}
              setSave={setSave}
              register={register}
              setError={setError}
              clearErrors={clearErrors}
            />
          )}
        </Main>
        {data?.error && <ErrorMsg error={data?.error} />}
        {errors.title && <ErrorMsg error={errors?.title?.message!} />}
        {errors.content && <ErrorMsg error={errors?.content?.message!} />}
      </Cont>
      {save && (
        <ConfirmModal
          loading={Loading}
          type="create-post"
          closeModal={setSave}
        />
      )}
      {cancel && (
        <ConfirmModal
          loading={Loading}
          closeModal={setCancel}
          closePost={setCreate}
          type="cancel-create-post"
        />
      )}
      <DimBackground zIndex={101} onClick={() => setCancel(true)} />
    </form>
  );
};
const Cont = styled(Modal)<{ isNext: boolean }>`
  padding: 0;
  height: 80vh;
  z-index: 102;
  border: none;
  display: block;
  border-radius: 5px;
  width: ${(p) => (!p.isNext ? '35vw' : '70vw')};
  min-width: ${(p) => (p.isNext ? '1000px' : '600px')};
`;
const Main = styled.article<{ isNext: boolean }>`
  display: flex;
  align-items: center;
  .createAvatar {
    .isPreivewTag,
    .isImageTag,
    .noImageDiv {
      height: 75vh;
      min-width: 600px;
      min-height: 580px;
      border-right: ${(p) => !p.isNext && 'none'};
      width: ${(p) => (!p.isNext ? '35vw' : '40vw')};
    }
  }
  .create-post-info {
    width: 30vw;
    height: 75vh;
    min-width: 400px;
    min-height: 580px;
  }
`;
