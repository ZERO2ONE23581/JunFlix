import useSWR from 'swr';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import useUser from '../../../../../../../src/libs/client/useUser';
import { MutationRes } from '../../../../../../../src/types/mutation';
import { Btn } from '../../../../../../../src/components/Style/Button';
import useMutation from '../../../../../../../src/libs/client/useMutation';
import { IEditPostForm, IGetPost } from '../../../../../../../src/types/post';
import { CommentList } from '../../../../../../../src/components/User/Comment/CommentList';
import { ThumnailAvatar } from '../../../../../../../src/components/User/Avatar/Thumnail';
import { LikeCommentWrap } from '../../../../../../../src/components/Style/Icon/LikeCommentWrap';
import { CreateComments } from '../../../../../../../src/components/User/Comment/Create/CreateComments';
import { DeleteCommentModal } from '../../../../../../../src/components/User/Comment/Delete/DeleteCommentModal';
import { Form, Page } from '../../../../../../../styles/global';

const PostInfo: NextPage = () => {
  const router = useRouter();
  const { isLoggedIn, loggedInUser } = useUser();
  const { user_id, board_id, post_id } = router.query;
  const isQueryId = Boolean(user_id && board_id && post_id);
  const { data } = useSWR<IGetPost>(
    isQueryId && `/api/user/${user_id}/board/${board_id}/post/${post_id}`
  );
  const [editPost, { data: dataRes, loading }] = useMutation<MutationRes>(
    `/api/user/${user_id}/board/${board_id}/post/${post_id}/edit`
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
  const [openDelModal, setOpenDelModal] = useState(false);
  const [openSetup, setOpenSetup] = useState(false);
  const [preview, setPreview] = useState('');
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
    if (data && data.post && data?.ok) {
      if (data.post.title) setValue('title', data.post.title);
      if (data.post.content) setValue('content', data.post.content);
      if (data.post.createdAt) setValue('createdAt', data.post.createdAt);
    }
    if (dataRes?.ok)
      setTimeout(() => {
        router.reload();
      }, 1000);
  }, [avatar, setValue, data, dataRes]);
  //
  return (
    <>
      <Page>
        <BtnWrap>
          <Btn
            name="Board"
            loading={loading}
            type="button"
            onClick={() => router.push(`/user/${user_id}/board/${board_id}`)}
          />
          {isLoggedIn && loggedInUser?.id === Number(user_id) && (
            <Btn
              name={openSetup ? 'Back' : 'Set up'}
              loading={loading}
              type="button"
              onClick={() => setOpenSetup((p) => !p)}
            />
          )}
          {openSetup && (
            <BtnWrap>
              <Btn
                loading={loading}
                name={edit ? 'Cancel' : 'Edit'}
                type="button"
                onClick={() => setEdit((p) => !p)}
              />
              <Btn
                loading={loading}
                name="Delete"
                type="button"
                onClick={() => setOpenDelModal((p) => !p)}
              />
            </BtnWrap>
          )}
        </BtnWrap>

        <Form onSubmit={handleSubmit(onValid)}>
          <ThumnailAvatar url={data?.post.avatar} preview={preview} />
          <label htmlFor="avatar" />
          <Input
            {...register('avatar')}
            type="file"
            id="avatar"
            name="avatar"
            disabled={!edit && true}
          />
          {errors.avatar && <Errors>{errors.avatar.message}</Errors>}

          <label htmlFor="title" />
          <Input
            {...register('title', {
              required: '포스트 제목을 입력해주세요.',
              maxLength: {
                value: 30,
                message: '포스트 제목은 30자 이내여야 합니다.',
              },
            })}
            type="text"
            id="title"
            name="title"
            disabled={!edit && true}
            placeholder="게시물의 제목을 입력하세요."
          />
          {errors.avatar && <Errors>{errors.avatar.message}</Errors>}

          <label htmlFor="content" />
          <Input
            {...register('content')}
            type="text"
            id="content"
            name="content"
            disabled={!edit && true}
            placeholder="게시물의 내용을 작성해 주세요."
          />
          {errors.avatar && <Errors>{errors.avatar.message}</Errors>}

          <label htmlFor="createdAt" />
          <Input
            {...register('createdAt')}
            id="createdAt"
            name="createdAt"
            disabled={true}
          />

          {dataRes?.message && <Errors>{dataRes?.message}</Errors>}
          {dataRes?.error && <Errors>{dataRes?.error}</Errors>}

          {edit && <Btn loading={loading} name="Edit Post" type="submit" />}
        </Form>

        <section>
          <LikeCommentWrap type="post" reviewId={null} userId={null} />
          <h1>해당 포스트에 댓글 남기기</h1>
          <CreateComments type="post" />
          <CommentList isPost />
        </section>
      </Page>

      {openDelModal && (
        <DeleteCommentModal type="post" setOpenDelModal={setOpenDelModal} />
      )}
    </>
  );
};
export default PostInfo;
const BtnWrap = styled.div`
  gap: 6px;
  display: flex;
  align-items: center;
`;
