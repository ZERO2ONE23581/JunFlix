import {
  OkMsg,
  ErrMsg,
  Article,
  FlexAbsPost,
  PageCont,
} from '../../../../../../../styles/components/default';
import useSWR from 'swr';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Btn } from '../../../../../../../src/components/Btn';
import { Input } from '../../../../../../../src/components/Input';
import useUser from '../../../../../../../src/libs/client/useUser';
import { MutationRes } from '../../../../../../../src/types/mutation';
import useAvatar from '../../../../../../../src/libs/client/useAvatar';
import useMutation from '../../../../../../../src/libs/client/useMutation';
import { IEditPostForm, IPostRes } from '../../../../../../../src/types/post';
import { ThumNail } from '../../../../../../../src/components/Post/AllPostsWithBoard';
import { DeleteModal } from '../../../../../../../src/components/Modal/board/settting/delete/modal';
import {
  Likes,
  PostLikes,
} from '../../../../../../../src/components/Likes/post';

const myPost: NextPage = () => {
  const router = useRouter();
  const { isloggedIn, loggedInUserId } = useUser();
  const { userId, boardId, postId } = router.query;
  const urlData = Boolean(userId && boardId && postId);
  const { data: swrData } = useSWR<IPostRes>(
    urlData && `/api/user/${userId}/board/${boardId}/post/${postId}`
  );
  const [editPost, { data, loading }] = useMutation<MutationRes>(
    `/api/user/${userId}/board/${boardId}/post/${postId}/edit`
  );
  const {
    watch,
    setValue,
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
  //
  const [edit, setEdit] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const [openSetup, setOpenSetup] = useState(false);
  const [preview, setPreview] = useState('');
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
    if (swrData && swrData.post && swrData?.ok) {
      if (swrData.post.title) setValue('title', swrData.post.title);
      if (swrData.post.content) setValue('content', swrData.post.content);
      if (swrData.post.createdAt) setValue('createdAt', swrData.post.createdAt);
    }
    if (data?.ok)
      setTimeout(() => {
        router.reload();
      }, 1000);
  }, [avatar, setValue, swrData, data]);
  //
  return (
    <PageCont>
      {delModal && (
        <DeleteModal
          userId={userId}
          postId={postId}
          boardId={boardId}
          deleteClick={() => setDelModal((p) => !p)}
        />
      )}
      <section className="read-post-cont">
        <article className="btn-wrap">
          <Btn
            type="back"
            btnName="Back"
            onClick={() => router.push(`/user/${userId}/board/${boardId}`)}
          />
          <>
            {isloggedIn && loggedInUserId === Number(userId) && (
              <Btn
                type="board-setting"
                onClick={() => setOpenSetup((p) => !p)}
                btnName="Setting"
              />
            )}
          </>
          <FlexAbsPost>
            {openSetup && (
              <>
                <Btn
                  type="edit-post"
                  onClick={() => setEdit((p) => !p)}
                  btnName={edit ? 'Back' : 'Edit Post'}
                />
                <Btn
                  type="delete-post"
                  onClick={() => setDelModal((p) => !p)}
                  btnName="Delete"
                />
              </>
            )}
          </FlexAbsPost>
        </article>
        <form onSubmit={handleSubmit(onValid)}>
          {data?.message && <OkMsg>{data?.message}</OkMsg>}
          {data?.error && <ErrMsg>{data?.error}</ErrMsg>}
          <ThumNail>
            {preview ? (
              <img src={`${preview}`} alt="포스트 썸네일 이미지" />
            ) : swrData?.post?.avatar ? (
              <img
                src={`${useAvatar(swrData?.post.avatar)}`}
                alt="포스트 썸네일 이미지"
              />
            ) : (
              <img src="/img/post_thum.svg" alt="포스트 썸네일 이미지" />
            )}
          </ThumNail>
          <Input
            register={register('avatar')}
            type="file"
            name="avatar"
            label="Post Image"
            disabled={!edit && true}
            errMsg={errors.avatar?.message}
          />
          <Input
            register={register('title', {
              required: '포스트 제목을 입력해주세요.',
              maxLength: {
                value: 30,
                message: '포스트 제목은 30자 이내여야 합니다.',
              },
            })}
            type="text"
            name="title"
            disabled={!edit && true}
            placeholder="게시물의 제목을 입력하세요."
            errMsg={errors.title?.message}
          />
          <Input
            register={register('content')}
            type="text"
            name="content"
            disabled={!edit && true}
            placeholder="게시물의 내용을 작성해 주세요."
            errMsg={errors.content?.message}
          />
          <Input
            name="createdAt"
            disabled={true}
            register={register('createdAt')}
          />
          {edit && <Btn type="submit" btnName="Edit" loading={loading} />}
        </form>
        <PostLikes userId={userId} boardId={boardId} postId={postId} />
      </section>
    </PageCont>
  );
};
export default myPost;

export const BoardCont = styled(Article)`
  flex-direction: column;
  justify-content: center;
  padding: 20px 100px;
  width: 100%;
  h1 {
    font-weight: 600;
    font-size: 1.5rem;
    text-align: start;
  }
  h2 {
    text-align: end;
  }
  h3 {
    text-align: start;
    font-size: 1rem;
  }
`;
