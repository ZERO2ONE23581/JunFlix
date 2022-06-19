import type { NextPage } from 'next';
import { Post } from '@prisma/client';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { IPostForm } from '../../../../../../../src/types/post';
import { Btn } from '../../../../../../../src/components/Style/Button';
import useMutation from '../../../../../../../src/libs/client/useMutation';
import { ThumnailAvatar } from '../../../../../../../src/components/User/Avatar/Thumnail';
import {
  Errors,
  Form,
  FormCont,
  Input,
  Page,
} from '../../../../../../../styles/global';
import styled from '@emotion/styled';

interface ICreatePostRes {
  ok: boolean;
  error?: string;
  post?: Post;
}

const CreatePost: NextPage = () => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const [createPost, { data, loading }] = useMutation<ICreatePostRes>(
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
  const [preview, setPreview] = useState('');
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
  }, [avatar, watch, data, router]);
  return (
    <Cont>
      <FormCont className="form-cont">
        <h1>Create Post</h1>
        <Form onSubmit={handleSubmit(onValid)}>
          <div className="label-input-wrap">
            <label htmlFor="avatar" className="avatar-label">
              <ThumnailAvatar preview={preview} url={Boolean(preview)} />
            </label>
            <Input
              {...register('avatar')}
              type="file"
              id="avatar"
              name="avatar"
            />
            {errors.avatar?.message && <Errors>{errors.avatar.message}</Errors>}
          </div>

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
            name="title"
            placeholder="게시물의 제목을 입력해주세요."
          />
          {errors.title?.message && <Errors>{errors.title.message}</Errors>}

          <label htmlFor="content" />
          <Input
            {...register('content')}
            type="text"
            name="content"
            placeholder="게시물의 내용을 입력해주세요."
          />
          {errors.content?.message && <Errors>{errors.content.message}</Errors>}

          <Btn type="submit" name="포스트 만들기" loading={loading} />
          {data?.error && <Errors>{data?.error}</Errors>}
        </Form>
      </FormCont>
    </Cont>
  );
};
export default CreatePost;

const Cont = styled(Page)`
  padding-top: 50px;
  height: 100vh;
  background-color: ${(p) => p.theme.color.logo};
  .form-cont {
    width: 700px;
    margin: 0 auto;
    padding: 30px 40px;
    h1 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 20px;
    }
  }
`;
const CreateForm = styled(Form)``;
