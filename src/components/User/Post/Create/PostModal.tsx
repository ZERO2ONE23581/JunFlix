import { BtnWrap } from '../BtnWrap';
import styled from '@emotion/styled';
import { Post } from '@prisma/client';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { PostNotice } from './CreatePostNotice';
import { HostIcon } from '../../Avatar/Profile';
import { PostInputs } from '../CreatePostInputs';
import { ErrorMsg } from '../../../Style/ErrMsg';
import { PostAvatar } from '../PostAvatar';
import { IPostForm } from '../../../../types/post';
import useMutation from '../../../../libs/client/useMutation';
import { ModalClose, ModalSchema } from '../../../../../styles/global';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface ICreatePostRes {
  ok: boolean;
  error?: string;
  post?: Post;
}
interface ICreatePostModalProps {
  openModal: Dispatch<SetStateAction<boolean>>;
}
export const CreatePostModal = ({ openModal }: ICreatePostModalProps) => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const [createPost, { data, loading }] = useMutation<ICreatePostRes>(
    `/api/user/${user_id}/board/${board_id}/post/create`
  );
  const {
    watch,
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostForm>({ mode: 'onSubmit' });
  const onValid = async ({ avatar, title, content }: IPostForm) => {
    const Title = title?.toUpperCase();
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
      createPost({ Title, content, avatar: id });
      setAvatarLoading((p) => !p);
    } else {
      createPost({ Title, content });
    }
  };
  const maxTitle = 20;
  const maxCnt = 1000;
  const avatar = watch('avatar');
  const [next, setNext] = useState(false);
  const [preview, setPreview] = useState('');
  const [avatarLoading, setAvatarLoading] = useState(false);
  const Loading = avatarLoading ? avatarLoading : loading ? loading : null;
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
    if (data?.ok) {
      if (data?.ok && data.post) {
        alert('새로운 게시물이 생성되었습니다. 게시물로 이동합니다.');
        router.replace(
          `/user/${data.post.UserID}/board/${data.post?.BoardID}/post/${data.post.id}`
        );
      }
    }
  }, [avatar, data, router]);
  return (
    <>
      <Cont>
        <form onSubmit={handleSubmit(onValid)}>
          <BtnWrap
            next={next}
            loading={Loading}
            setNext={setNext}
            openModal={openModal}
          />
          <article className="wrapper">
            <PostAvatar
              disabled={next}
              preview={preview}
              register={register('avatar')}
            />
            {next && (
              <article className="wrap">
                <HostIcon size={40} />
                <PostInputs
                  watch={watch}
                  maxCnt={maxCnt}
                  maxTitle={maxTitle}
                  register={register}
                  getValues={getValues}
                  ErrCnt={errors.content?.message}
                  ErrTitle={errors.title?.message}
                />
              </article>
            )}
          </article>
        </form>
        <PostNotice next={next} maxTitle={maxTitle} maxCnt={maxCnt} />

        {errors.avatar && <ErrorMsg error={errors.avatar.message} />}
        {data?.error && <ErrorMsg error={data.error} />}
      </Cont>
      <ModalClose onClick={() => openModal(true)} />
    </>
  );
};
const Cont = styled(ModalSchema)`
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
