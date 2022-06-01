import {
  OkMsg,
  ErrMsg,
  Article,
  FlexAbsPost,
  PageCont,
} from '../../../../../../../styles/default';
import useSWR from 'swr';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Btn } from '../../../../../../../src/components/Button';
import { Input } from '../../../../../../../src/components/Input';
import useUser from '../../../../../../../src/libs/client/useUser';
import { MutationRes } from '../../../../../../../src/types/mutation';
import useAvatar from '../../../../../../../src/libs/client/useAvatar';
import useMutation from '../../../../../../../src/libs/client/useMutation';
import { IEditPostForm, IPostRes } from '../../../../../../../src/types/post';
import { ThumNail } from '../../../../../../../src/components/Post/AllPostsWithBoard';
import { DeleteModal } from '../../../../../../../src/components/Modal/Board/Delete';
import { PostLikes } from '../../../../../../../src/components/Button/Likes/post';
import { FollowBoard } from '../../../../../../../src/components/Button/Follow';
import { PostComments } from '../../../../../../../src/components/Button/Comments/post';

const Post_Detail: NextPage = () => {
  const router = useRouter();
  const { isloggedIn, loggedInUser } = useUser();
  const { user_id, board_id, post_id } = router.query;
  const isQueryId = Boolean(user_id && board_id && post_id);
  //
  const { data } = useSWR<IPostRes>(
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
    <PageCont>
      {delModal && (
        <DeleteModal
          userId={user_id}
          postId={post_id}
          boardId={board_id}
          deleteClick={() => setDelModal((p) => !p)}
        />
      )}
      <section className="read-post-cont">
        <article className="btn-wrap">
          <Btn
            type="back"
            btnName="Back"
            onClick={() => router.push(`/user/${user_id}/board/${board_id}`)}
          />
          <>
            {isloggedIn && loggedInUser?.id === Number(user_id) && (
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
          {edit && <Btn type="submit" btnName="Edit" loading={loading} />}
        </form>
        <LikesCommentsWrap>
          <PostLikes userId={user_id} boardId={board_id} postId={post_id} />
          <PostComments userId={user_id} boardId={board_id} postId={post_id} />
        </LikesCommentsWrap>
      </section>
    </PageCont>
  );
};
export default Post_Detail;

const LikesCommentsWrap = styled.article`
  gap: 20px;
  display: flex;
  align-items: center;
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
