import type { NextPage } from 'next';
import { Post } from '@prisma/client';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { IPostForm } from '../../../../../../../src/types/post';
import { Btn } from '../../../../../../../src/components/Button';
import { Input } from '../../../../../../../src/components/Input';
import { ErrMsg, PageCont } from '../../../../../../../styles/default';
import useMutation from '../../../../../../../src/libs/client/useMutation';
import { Avatar } from '../../../../../../../src/components/Avatar';

interface ICreatePostRes {
  ok: boolean;
  error?: string;
  post?: Post;
}

const CreatePost: NextPage = () => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const [createPost, { data: dataRes, loading }] = useMutation<ICreatePostRes>(
    `/api/user/${user_id}/board/${board_id}/post/create`
  );
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostForm>({ mode: 'onSubmit' });
  const avatar = watch('avatar');
  const onValid = async ({ avatar, title, content }: IPostForm) => {
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
      return createPost({ title, content, avatar: id });
    } else {
      return createPost({ title, content });
    }
  };
  //
  const [preview, setPreview] = useState('');
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
    if (dataRes?.ok) {
      if (dataRes?.ok && dataRes.post) {
        alert('새로운 게시물이 생성되었습니다. 게시물로 이동합니다.');
        router.replace(
          `/user/${dataRes.post.UserID}/board/${dataRes.post?.BoardID}/post/${dataRes.post.id}`
        );
      }
    }
  }, [avatar, watch, dataRes, router]);
  return (
    <PageCont>
      <section className="create-post-cont">
        <form onSubmit={handleSubmit(onValid)}>
          {dataRes?.error && <ErrMsg>{dataRes?.error}</ErrMsg>}
          <Avatar preview={preview} />
          <Input
            register={register('avatar')}
            type="file"
            name="avatar"
            label="Post Image"
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
            placeholder="게시물의 제목을 입력해주세요."
            errMsg={errors.title?.message}
          />
          <Input
            register={register('content')}
            type="text"
            name="content"
            placeholder="게시물의 내용을 입력해주세요."
            errMsg={errors.content?.message}
          />
          <Btn type="submit" btnName="Create Post" loading={loading} />
        </form>
      </section>
    </PageCont>
  );
};
export default CreatePost;
