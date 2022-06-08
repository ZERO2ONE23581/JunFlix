import { OkMsg, ErrMsg, Article } from '../../../../../../../styles/default';
import useSWR from 'swr';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Input } from '../../../../../../../src/components/Input';
import useUser from '../../../../../../../src/libs/client/useUser';
import { MutationRes } from '../../../../../../../src/types/mutation';
import useAvatar from '../../../../../../../src/libs/client/useAvatar';
import useMutation from '../../../../../../../src/libs/client/useMutation';
import { IEditPostForm, IGetPost } from '../../../../../../../src/types/post';
import { DeleteModal } from '../../../../../../../src/components/Modal/Board/Delete';
import { Btn } from '../../../../../../../styles/btn';
import { ThumNail } from '../../../../../../../styles/image';
import { IconWithCommentList } from '../../../../../../../src/components/Icon/WithCommentList';

const Post_Detail: NextPage = () => {
  const router = useRouter();
  const { isloggedIn, loggedInUser } = useUser();
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
  const [delModal, setDelModal] = useState(false);
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
      <Cont>
        <BtnWrap>
          <Button
            typeEdit={false}
            type="button"
            onClick={() => router.push(`/user/${user_id}/board/${board_id}`)}
          >
            {loading ? 'Loading...' : 'Board'}
          </Button>
          {isloggedIn && loggedInUser?.id === Number(user_id) && (
            <Button
              typeEdit={false}
              type="button"
              onClick={() => setOpenSetup((p) => !p)}
            >
              {loading ? 'Loading...' : openSetup ? 'Back' : 'Set up'}
            </Button>
          )}
          {openSetup && (
            <BtnWrap>
              <Button
                typeEdit={false}
                type="button"
                onClick={() => setEdit((p) => !p)}
              >
                {loading ? 'Loading...' : edit ? 'Cancel' : 'Edit'}
              </Button>
              <Button
                typeEdit={false}
                type="button"
                onClick={() => setDelModal((p) => !p)}
              >
                {loading ? 'Loading...' : 'Delete'}
              </Button>
            </BtnWrap>
          )}
        </BtnWrap>
        <form onSubmit={handleSubmit(onValid)}>
          {dataRes?.message && <OkMsg>{dataRes?.message}</OkMsg>}
          {dataRes?.error && <ErrMsg>{dataRes?.error}</ErrMsg>}
          <ThumNail>
            {preview ? (
              <img src={`${preview}`} alt="포스트 썸네일 이미지" />
            ) : data?.post?.avatar ? (
              <img
                src={`${useAvatar(data?.post.avatar)}`}
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
          {edit && (
            <Button typeEdit={true} type="submit">
              {loading ? 'Loading...' : 'Edit Post'}
            </Button>
          )}
        </form>
        <IconWithCommentList type="post" />
      </Cont>
      {delModal && (
        <DeleteModal
          userId={user_id}
          postId={post_id}
          boardId={board_id}
          deleteClick={() => setDelModal((p) => !p)}
        />
      )}
    </>
  );
};
export default Post_Detail;

const Cont = styled.section`
  padding: 20px 20%;
`;

const BtnWrap = styled.div`
  gap: 6px;
  display: flex;
  align-items: center;
`;

const Button = styled(Btn)<{ typeEdit: boolean }>`
  font-size: ${(p) => (p.typeEdit ? '1.2rem' : '1rem')};
  width: ${(p) => (p.typeEdit ? '150px' : '90px')};
  height: ${(p) => (p.typeEdit ? '50px' : '40px')};
`;
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
